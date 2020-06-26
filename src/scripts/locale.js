import { DICTIONARY } from '../locales';
import { LOCALES_CODES, DEFAULT_LOCALE_CODE, STORAGE_DATA } from './config';
import { getStorage, setStorage } from './utils';

export const t = (key) => {
  if (!key) {
    return;
  }

  const currentLocale = localStorage.getItem('lang');
  if (
    !currentLocale ||
    !DICTIONARY[currentLocale] ||
    !DICTIONARY[currentLocale][key]
  ) {
    return;
  }

  return DICTIONARY[currentLocale][key];
};

export const applyTemplate = (tmpl) => {
  const regex = /\{\{([a-zA-Z])\w+\}\}/g;
  return tmpl.replace(regex, (word) => t(word.replace(/[{}]/g, '')));
};

export const initLocaleSelector = (calendar, lang) => {
  const localeSelectorEl = document.getElementById('locale-selector');
  // build the locale selector's options
  calendar
    .getAvailableLocaleCodes()
    .filter((localeCode) => LOCALES_CODES.includes(localeCode))
    .forEach((localeCode) => {
      const optionEl = document.createElement('option');
      optionEl.value = localeCode;
      optionEl.selected = localeCode == lang;
      optionEl.innerText = getLocaleStringName(localeCode);
      localeSelectorEl.appendChild(optionEl);
    });

  // dynamically change the calendar option and rerender html components
  localeSelectorEl.addEventListener('change', (e) => {
    calendar.setOption('locale', e.target.value);
    setLang(e.target.value);
    document.dispatchEvent(new CustomEvent('lang-change'));
    e.preventDefault();
  });
};

// From Angular API (recoded)
export const getFirstBrowserLanguage = () => {
  const nav = window.navigator;
  const browserLanguagePropertyKeys = [
    'language',
    'browserLanguage',
    'systemLanguage',
    'userLanguage',
  ];
  let i, language;

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i];
      if (language && language.length) {
        return language.substring(0, 2);
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]];
    if (language && language.length) {
      return language.substring(0, 2);
    }
  }

  return null;
};

export const getLocaleStringName = (languageCode) => {
  return t(languageCode.toUpperCase());
};

const resetLocaleStringNames = () => {
  const options = document.querySelectorAll('#locale-selector option');
  options.forEach((option) => {
    option.innerText = getLocaleStringName(option.value);
  });
};

export const setLang = (lang) => {
  setStorage(STORAGE_DATA.LANG, lang);
  resetLocaleStringNames();
};

export const getLang = () => {
  const storageLang = getStorage(STORAGE_DATA.LANG);
  return storageLang || getFirstBrowserLanguage() || DEFAULT_LOCALE_CODE;
};
