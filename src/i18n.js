import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import enLang from "./language/en.json";
import frLang from "./language/fr.json";
import hindiLang from "./language/hi.json"
import { initReactI18next } from "react-i18next";

const resources = { // import all the languages stored inside 'langauage' folder
    en: enLang,
    fr: frLang,
    hi: hindiLang
}

i18next.use(I18nextBrowserLanguageDetector)
.use(initReactI18next)
.init({
    resources,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18next;