import page from 'page';
import checkConnectivity from './network.js';
import { fetchTodos, fetchTodo, createTodo, deleteTodo } from './api/todo.js';
import { setTodos, setTodo, getTodos, unsetTodo } from './idb.js';

checkConnectivity({});
document.addEventListener('connection-changed', e => {
  document.offline = !e.detail;
  if (!document.offline) {
    // Sync data ...
  }
});

const app  = document.querySelector('#app .outlet');

fetch('/config.json')
  .then((result) => result.json())
  .then(async (config) => {
    console.log('[todo] Config loaded !!!');
    window.config = config;

    page('/', async () => {
      const module = await import('./views/home.js');
      const Home = module.default;

      const ctn = app.querySelector('[page="Home"]');
      const homeView = new Home(ctn);

      let todos = [];
      if (!document.offline && navigator.onLine) {
        const data = await fetchTodos();
        todos = await setTodos(data);
      } else {
        todos = await getTodos() || [];
      }

      homeView.todos = todos;
      homeView.renderView();
      displayPage('Home');

      // Create todo
      document.addEventListener('create-todo', async ({ detail: todo }) => {
        await setTodo(todo);
        if (!document.offline && navigator.onLine === true) {
          // If connection is good enought, do thte HTTP call
          const result = await createTodo(todo);
          if (result !== false) {
            // If we successfuly get a result from API
            // Get the updated todo list
            const todos  = await getTodos();
            // Rerender the template
            homeView.todos = todos;
            return homeView.renderView();
          }
          // In case of an error
          // Update the synced flag of the new todo
          todo.synced = 'false';
          const todos = await setTodo(todo);
          // Rerender the template
          homeView.todos = todos;
          return homeView.renderView();
        }
      });

      document.addEventListener('delete-todo', async ({ detail }) => {
        if (!document.offline && navigator.onLine === true) {
          const result = await deleteTodo(detail.id);
          if (result !== false) {
            // If we successfuly get a result from API
            // Get the updated todo list
            const todo = await unsetTodo(detail.id);
            // Rerender the template
            return document.dispatchEvent(new CustomEvent('render-view', { detail: todo }));
          }
          // In case of an error
          detail.deleted = 'true';
        }
      });
    });

    page();
  });

  function displayPage(page) {
    const skeleton = document.querySelector('#app .skeleton');
    skeleton.removeAttribute('hidden');
    const pages = app.querySelectorAll('[page]');
    pages.forEach(page => page.removeAttribute('active'));
    skeleton.setAttribute('hidden', 'true');
    const p = app.querySelector(`[page="${page}"]`);
    p.setAttribute('active', true);
  }