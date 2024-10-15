// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Define the initialization options
const options = {
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false, // React already handles XSS protection
  },
  backend: {
    loadPath: `${process.env.REACT_APP_BASE_URL}locales/{{lng}}.json`,
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
  .catch((error) => {
    console.error('i18n initialization error:', error);
  });

export default i18n;
