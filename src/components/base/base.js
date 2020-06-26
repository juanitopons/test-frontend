import { applyTemplate } from '../../scripts/locale';

export class BaseHtmlElement extends HTMLElement {
  set template(template) {
    this._template = template;
    this._render();
  }

  set events(events) {
    this._events = events;
    this._attachEventHandlers();
  }

  constructor() {
    super();
    document.addEventListener('lang-change', (event) => {
      if (this._template) {
        this._render();
        if (this._events) {
          this._attachEventHandlers();
        }
      }
      event.preventDefault();
    });
  }

  _attachEventHandlers() {
    this._events();
  }

  _render() {
    this.innerHTML = applyTemplate(this._template);
  }
}
