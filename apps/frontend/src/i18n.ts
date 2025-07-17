// apps/frontend/src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des fichiers de traduction
import translationFR from './locales/fr.json';
import translationEN from './locales/en.json';
import translationES from './locales/es.json';
import translationDE from './locales/de.json';
import translationRU from './locales/ru.json';
import translationCA from './locales/ca.json';

i18n
  .use(LanguageDetector) // détecte la langue du navigateur
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: translationFR },
      en: { translation: translationEN },
      es: { translation: translationES },
      de: { translation: translationDE },
      ru: { translation: translationRU },
      ca: { translation: translationCA },
    },
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
  });

export default i18n;