import { render, html } from 'lit-html';
import '../component/todo-card.js';
import 'lit-icon';


export default class Home {
  constructor(page) {
    this.page = page;
    this.properties = {
      todo: '',
      desc:'',
      todos: []
    };

    this.renderView();
  }

  set todos(value) {
    this.properties.todos = value;
  }

  get todos() {
    return this.properties.todos;
  }

  template() {
    return html`
      <section class="h-full">
        <div ?hidden="${!this.todos.length}">
          <header>
            <h1 class="mt-2 px-4 text-xl">Votre Todo : </h1>
          </header>
          <main class="todolist px-4 pb-20">
            <ul>
              ${this.todos.map(todo => html`<todo-card .todo="${todo}"></todo-card>`)}
            </ul>
          </main>
        </div>
        <div class="mt-8" ?hidden="${!!this.todos.length}">
          <img class="object-contain px-20" src="./assets/img/nodata.svg" alt="No data">
          <p class="mt-4 text-center text-xl">No todos yet, try to create a new one</p>
        </div>
          <form @submit="${this.handleForm.bind(this)}" id="addTodo form-todo-y" class="w-full h-full flex justify-between items-center px-4 py-3">
                <div class="flex flex-wrap -mx-3">
                  <div class="w-full md:w-1/2 px-3 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                      Titre
                    </label>
                    <input 
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                      id="grid-first-name" 
                      type="text" 
                      placeholder="mon super titre"
                      autocomplete="off"
                      .value="${this.properties.todo}"
                      @input="${e => this.properties.todo = e.target.value}"
                    >
                  </div>

                  <div class="w-full md:w-1/2 px-3 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                      Description
                    </label>
                    <input 
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                      id="grid-first-name" 
                      type="text" 
                      placeholder="ma super description"
                      autocomplete="off"
                      .value="${this.properties.desc}"
                      @input="${e => this.properties.desc = e.target.value}"
                    >
                  </div>
              </div>
                             
            <button
              aria-label="Add"
              class="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              type="submit">
              Ajouter
            </button>
            
          </form>  
      </section>

      <lit-iconset>
        <svg><defs>
          <g id="delete"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g>
          <g id="cloud-off"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"></path></g>
          <g id="send"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></g>
        </defs></svg>
      </lit-iconset>
    `;
  }

  renderView() {
    const view = this.template();
    render(view, this.page);
  }

  handleForm(e) {
    e.preventDefault();
    if (this.properties.todo === '') return console.log('[todo] Value is required !!!');
    const todo = {
      id: Date.now(),
      title: this.properties.todo,
      description: this.properties.desc,
      state: "true",
      synced: 'true',
      updated: 'false',
      done: 'false',
      deleted: 'false',
      date: Date.now()
    };

    console.log(this.properties.todo);
    console.log(this.properties.desc);

    const event = new CustomEvent('create-todo', { detail: todo });
    document.dispatchEvent(event);

    // Clearing input
    this.properties.todo = null;
    const input = document.querySelector('[name="todo"]');
    input.value = '';

    this.renderView();
  }
}
