// src/i18n.ts
import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Define the initialization options
const options: InitOptions = {
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false, // React already handles XSS protection
  },
  backend: {
    loadPath: `${import.meta.env.REACT_APP_BASE_URL}locales/{{lng}}.json`,
  },
  detection: {
    order: ['querystring', 'cookie'], // Use lowercase 'querystring' for consistency
    caches: ['cookie'],
  },
};

// Initialize i18n with necessary options
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(options)
  .catch((error: Error) => {
    console.error('i18n initialization error:', error);
  });

export default i18n;
