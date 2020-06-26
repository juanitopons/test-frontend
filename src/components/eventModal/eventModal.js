import { BaseHtmlElement } from '../base/base';
import template from './eventModal.html';
import './eventModal.scss';

export default class EventModal extends BaseHtmlElement {
  static NAME = 'event-modal';
  static get observedAttributes() {
    return ['open', 'title'];
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(title) {
    this.setAttribute('title', title);
  }

  get eventId() {
    return this.querySelector('event-detail').eventId;
  }

  set eventId(eventId) {
    this.querySelector('event-detail').eventId = eventId;
    this.open = true;
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(open) {
    if (open) {
      this.setAttribute('open', 'true');
    } else {
      this.removeAttribute('open');
    }
  }

  constructor() {
    super();
    this.addEventListener('close', function () {
      console.log('cancel event raised');
    });
  }

  connectedCallback() {
    this.template = template;
    this.events = this._attachEventHandlers;
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'title':
        this.querySelector('.modal-title span').textContent = newValue;
        break;
      case 'open':
        if (!newValue || newValue === '') {
          this.querySelector('.modal').classList.remove('visible', 'show');
        } else {
          this.querySelector('.modal').classList.add('visible', 'show');
        }
        break;
      default:
        break;
    }
  }

  _attachEventHandlers() {
    const closeBtns = this.querySelectorAll('button');
    closeBtns.forEach((closeBtn) => {
      closeBtn.addEventListener('click', (e) => {
        this.dispatchEvent(new CustomEvent('close'));
        this.querySelector('.modal').classList.remove('visible', 'show');
        e.preventDefault();
      });
    });
  }
}

customElements.define(EventModal.NAME, EventModal);
