import { BaseHtmlElement } from '../base/base';
import template from './confirmModal.html';
import './confirmModal.scss';

export default class ConfirmModal extends BaseHtmlElement {
  static NAME = 'confirm-modal';
  static get observedAttributes() {
    return ['open'];
  }

  get info() {
    return this._info;
  }

  set info(info) {
    this._info = info;
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
    this.addEventListener('accept', () => {
      console.log('Drop move was acceptted');
    });

    this.addEventListener('cancel', () => {
      console.log('Drop move was cancelled');
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

  close(dispatchEventName) {
    this.dispatchEvent(new CustomEvent(dispatchEventName));
    this.querySelector('.modal').classList.remove('visible', 'show');
  }

  cancel() {
    if (this._info) {
      this._info.revert();
    }
  }

  _attachEventHandlers() {
    const closeBtn = this.querySelector('button#close');
    closeBtn.addEventListener('click', (e) => {
      this.cancel();
      this.close('cancel');
      e.preventDefault();
    });

    const acceptBtn = this.querySelector('button#accept');
    acceptBtn.addEventListener('click', (e) => {
      this.close('accept');
      e.preventDefault();
    });
  }
}

customElements.define(ConfirmModal.NAME, ConfirmModal);
