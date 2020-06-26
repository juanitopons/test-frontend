import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import { getStorage, getInitialDate, setStorage, isWeekend } from './utils';
import { eventClickModal, eventDropModal } from './actions';
import components from '../components';

export const API_URL = 'http://localhost:4000/';
export const ROUTES = {
  EVENTS: 'events',
};
export const DEFAULT_LOCALE_CODE = 'es';
export const LOCALES_CODES = ['es', 'en'];
export const LOCALES = [esLocale];
export const DEFAULT_START = new Date();
export const DEFAULT_VIEW = 'timeGridWeek';
export const STORAGE_DATA = {
  START_DATE: { key: 'startDate', default: DEFAULT_START },
  LAST_VIEW: { key: 'lastView', default: DEFAULT_VIEW },
  LANG: { key: 'lang', default: DEFAULT_LOCALE_CODE },
};

export const CalendarConfig = (lang) => {
  return {
    timeZone: 'UTC',
    height: 'auto',
    locales: LOCALES,
    locale: lang,
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      bootstrapPlugin,
    ],
    themeSystem: 'bootstrap',
    headerToolbar: {
      left: 'timeGridDay,timeGridWeek',
      center: 'title',
      right: 'today prev,next',
    },
    initialView: getStorage(STORAGE_DATA.LAST_VIEW),
    initialDate: getInitialDate(),
    navLinks: true,
    editable: true,
    dayMaxEvents: true,
    firstDay: 1,
    events: {
      url: `${API_URL}${ROUTES.EVENTS}`,
      method: 'GET',
      extraParams: {},
      failure: function () {
        alert('there was an error while fetching events!');
      },
    },
    eventClick: (eventDetail) =>
      eventClickModal(eventDetail, components.EventModal.NAME),
    datesSet: (dateInfo) => {
      setStorage(STORAGE_DATA.START_DATE, new Date(dateInfo.startStr));
      setStorage(STORAGE_DATA.LAST_VIEW, dateInfo.view.type);
    },
    eventDrop: (info) => {
      if (isWeekend(info.event.start)) {
        eventDropModal(info, components.ConfirmModal.NAME);
      }
    },
  };
};

export const CALENDAR_ID = 'calendar';
