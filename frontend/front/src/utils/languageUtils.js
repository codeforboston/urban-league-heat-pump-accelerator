export const supportedLanguages = ["en", "pt", "es", "ht"];

export const checkUserLangPref = (lang) => supportedLanguages.includes(lang);

export const getBrowserLanguage = () => navigator.language.split("-")[0];

export const getUserLanguagePreference = () => {
  const browserLang = getBrowserLanguage();
  return checkUserLangPref(browserLang)
    ? browserLang
    : localStorage.getItem("langPref") || "en";
};
