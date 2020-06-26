import { STORAGE_DATA } from './config';

export const getStorage = (storageData) => {
  const value = localStorage.getItem(storageData.key);
  if (!value || value === '') {
    if (storageData.default) {
      setStorage(storageData, storageData.default);
    }

    return storageData.default;
  }

  return value;
};

const setHtmlLang = (lang) => {
  document.querySelector('html').setAttribute('lang', lang);
};

export const setStorage = (storageData, value) => {
  localStorage.setItem(storageData.key, value);
  if (storageData.key === 'lang') {
    setHtmlLang(value);
  }
};

export const getInitialDate = () => {
  const initialDate = getStorage(STORAGE_DATA.START_DATE);
  return formatDate(initialDate);
};

export const formatDate = (date) => {
  const theDate = new Date(date);
  let month = '' + (theDate.getMonth() + 1),
    day = '' + theDate.getDate(),
    year = theDate.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export const isWeekend = (date) => {
  const theDate = new Date(date);
  return theDate.getDay() == 6 || theDate.getDay() == 0;
};

export const isSameDate = (date1, date2) => {
  const theDate1 = new Date(date1).setHours(0, 0, 0, 0);
  const theDate2 = new Date(date2).setHours(0, 0, 0, 0);

  return theDate1 === theDate2;
};
