import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enLang from "./language/en.json";
import frLang from "./language/fr.json";
import hindiLang from "./language/hi.json";

const resources = {
  en: {
    translation: enLang
  },
  fr: {
    translation: frLang
  },
  hi: {
    translation: hindiLang
  }
};

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18next;