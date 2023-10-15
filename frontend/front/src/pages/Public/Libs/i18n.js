import React from "react";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../Locale/en.json";
import ptTranslations from "../Locale/pt.json";
import esTranslations from "../Locale/es.json";
import frTranslations from "../Locale/fr.json";

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    resources: {
      en: { ...enTranslations }, // English - United States
      pt: { ...ptTranslations }, // Portuguese - Brazil
      es: { ...esTranslations }, // Spanish - Latin America
      fr: { ...frTranslations }, // French - Haiti
    },
    lng: "en", // default language
  });

console.log(i18next.t("key"));
