import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enLang from "./language/english.json";
import frLang from "./language/french.json";
import hindiLang from "./language/hindi.json";
import odiaLang from "./language/odia.json";
import kannadaLang from "./language/kannada.json";
import bengaliLang from "./language/bengali.json";

const resources = {
  en: {
    translation: enLang
  },
  fr: {
    translation: frLang
  },
  hi: {
    translation: hindiLang
  },
  od:{
    translation: odiaLang
  },
  kan:{
    translation: kannadaLang
  },
  ben:{
    translation: bengaliLang
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