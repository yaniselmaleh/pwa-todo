import { LitElement, html } from 'lit-element';

class TodoCard  extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      todo: Object
    };
  }

  constructor() {
    super();
    this.todo = {};
  }

  deleteItem() {
    const event = new CustomEvent('delete-todo', { detail: this.todo });
    document.dispatchEvent(event);
  }

  updateItem() {
    this.todo.done = this.todo.done === 'true'  ? 'false' : 'true';
    const event = new CustomEvent('update-todo', { detail: this.todo });
    document.dispatchEvent(event);
  }

  render() {
    return html`
      <style>
        input:checked + svg {
          display: block;
        }
      </style> 
      <section class="toto-card mt-4 px-4 py-3 bg-gray-300 rounded-lg flex items-center shadow-sm">
        <aside>
          <label class="flex justify-start items-start" tabindex="0" aria-label="Check todo">
            <div class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center focus:border-blue-500">
              <input type="checkbox" name="todo[]" class="opacity-0 absolute" tabindex="0"  ?checked="${this.todo.done === 'true'}" @change=${this.updateItem}>
              <svg class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
            </div>
          </label>
        </aside>
        <main class="flex-1 ml-2 truncate">
          <a class="block font-bold text-gray-900 truncate" href="${`/todos/${this.todo.id}`}">${this.todo.title}</a>
          <p class="text-gray-300">${this.todo.description}</p>
        </main>
        ${this.todo.synced === 'false' ? html`<lit-icon icon="cloud-off"></lit-icon>` : '' }
        <button @click="${this.deleteItem}" class="ml-2 text-red-600" aria-label="Delete">
          <lit-icon icon="delete"></lit-icon>
        </button>
      </section>
    `;
  }
}

customElements.define('todo-card', TodoCard);