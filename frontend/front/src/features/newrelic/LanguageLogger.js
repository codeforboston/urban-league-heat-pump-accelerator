import { useEffect } from "react";
import { logLanguagePref } from ".";

export const LanguageLogger = () => {
  useEffect(() => {
    const currentLang = localStorage.getItem("langPref");
    logLanguagePref(currentLang, "initial_load");
  }, []);

  return null;
};
