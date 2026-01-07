export const supportedLanguages = ["en", "pt", "es", "ht"];

export const isValidLangPref = (lang) => supportedLanguages.includes(lang);

export const getBrowserLanguage = () => navigator.language.split("-")[0];

export const getBrowserLanguageOrDefault = () => {
  const browserLang = getBrowserLanguage();
  return isValidLangPref(browserLang) ? browserLang : "en";
};

// Get lang pref for i18n init
export const getUserLanguagePreference = () => {
  const storedLangPref = localStorage.getItem("langPref");
  if (storedLangPref) return storedLangPref;
  return getBrowserLanguageOrDefault();
};
