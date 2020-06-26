import { BaseHtmlElement } from '../base/base';
import template from './eventDetail.html';
import './eventDetail.scss';
import { API_URL, ROUTES } from '../../scripts/config';

export default class EventDetail extends BaseHtmlElement {
  static attrs = ['id', 'start', 'end', 'color', 'title', 'description'];
  static NAME = 'event-detail';
  static get observedAttributes() {
    return ['event-id'];
  }

  get eventId() {
    return this.getAttribute('event-id');
  }

  set eventId(eventId) {
    this.setAttribute('event-id', eventId);
  }

  getEventDetails(eventId) {
    if (!eventId) {
      return;
    }

    const url = `${API_URL}${ROUTES.EVENTS}/${eventId}`;
    const headers = new Headers({
      Accept: 'application/json',
    });
    const fetchOpts = {
      cache: 'default',
      headers,
      method: 'GET',
      mode: 'cors',
    };

    return fetch(url, fetchOpts)
      .then((res) => (res.ok ? res.json() : throw new Error(res.status)))
      .catch((err) => {
        console.log(`Error fetching ${url} status ${err.message}`);
      });
  }

  renderEventData(eventData) {
    const self = this;
    EventDetail.attrs.forEach((attr) => {
      const el = self.querySelector(`#${attr}`);
      if (eventData[attr]) {
        const elAttr = el.querySelector('span');
        elAttr.innerHTML = eventData[attr];
        el.removeAttribute('hidden');
      } else {
        el.setAttribute('hidden', true);
      }
    });
  }

  constructor(eventId) {
    super();
    if (eventId && eventId !== '') {
      this.getEventDetails(eventId).then((eventData) =>
        this.renderEventData(eventData),
      );
    }
  }

  connectedCallback() {
    this.template = template;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.getEventDetails(newValue).then((eventData) =>
        this.renderEventData(eventData),
      );
    }
  }
}

customElements.define(EventDetail.NAME, EventDetail);
