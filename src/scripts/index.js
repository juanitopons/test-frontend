import polyfills from './polyfills';
import { Calendar } from '@fullcalendar/core';
import { CalendarConfig, CALENDAR_ID } from './config';
import { getLang, setLang, initLocaleSelector } from './locale';

import '../styles/index.scss';
import '@fortawesome/fontawesome-free/css/all.css';

document.addEventListener('DOMContentLoaded', () => {
  Promise.all(polyfills)
    .then(() => {
      initApp();
    })
    .catch((error) => {
      console.error('Failed fetching polyfills', error);
    });
});

const initApp = () => {
  const lang = getLang();
  setLang(lang);
  const calendarEl = document.getElementById(CALENDAR_ID);
  const calendar = new Calendar(calendarEl, CalendarConfig(lang));
  // Render calendar
  calendar.render();
  // Init locale select element
  initLocaleSelector(calendar, lang);
};
