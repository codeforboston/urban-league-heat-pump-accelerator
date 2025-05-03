import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../locales/en.json";
import ptTranslations from "../locales/pt-BR.json";
import esTranslations from "../locales/es-419.json";
import htTranslations from "../locales/ht.json";

const userLangPref = localStorage.getItem("langPref") || "en";

// configuration for i18next library
i18next
  .use(initReactI18next) // passes i18next down to react-i18next
  .init({
    // debug: false, // change to true to debug i18next
    fallbackLng: ["en", "es"], // fallback language
    resources: {
      en: { translation: { ...enTranslations } }, // English - United States
      pt: { translation: { ...ptTranslations } }, // Portuguese - Brazil
      es: { translation: { ...esTranslations } }, // Spanish - Latin America
      ht: { translation: { ...htTranslations } }, // Haitian Creole - Haiti
    },
    lng: userLangPref, // default language
  });
