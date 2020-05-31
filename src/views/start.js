import {
  render,
  html
} from 'lit-html';

export default class Start {
  constructor(page) {
    this.page = page;
    this.renderView();
  }

  template() {
    return html `
      <section class="h-full2">
        <div class="flex items-center justify-center h-screen">
        <div class="bg-blue-800 text-white font-bold rounded-lg border shadow-lg p-2">
        <h1>Bienvenue à toi !</h1>
          </div>
        </div>
      </section>
    `;
  }

  renderView() {
    const view = this.template();
    render(view, this.page);
  }
}