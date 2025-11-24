import { useEffect } from "react";
import { logLanguagePref } from ".";
import i18next from "i18next";

export const LanguageLogger = () => {
  useEffect(() => {
    const currentLang = i18next.language;
    logLanguagePref(currentLang, "initial_load");
  }, []);

  return null;
};
