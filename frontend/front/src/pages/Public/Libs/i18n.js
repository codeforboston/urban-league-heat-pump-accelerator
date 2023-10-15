import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../locales/en.json";
import ptTranslations from "../locales/pt-BR.json";
import esTranslations from "../locales/es-419.json";
import frTranslations from "../locales/fr-HT.json";

i18next
  .use(initReactI18next) // passes i18next down to react-i18next
  .init({
    debug: true,
    resources: {
      en: { translation: { ...enTranslations } }, // English - United States
      pt: { translation: { ...ptTranslations } }, // Portuguese - Brazil
      es: { translation: { ...esTranslations } }, // Spanish - Latin America
      fr: { translation: { ...frTranslations } }, // French - Haiti
    },
    lng: "en", // default language
  });

console.log(i18next.t("key"));
