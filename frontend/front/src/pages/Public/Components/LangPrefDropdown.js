import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Menu, MenuItem, Fade, Button, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";
import { logLanguagePref } from "../../../features/newrelic";
import { useDebouncedCallback } from "use-debounce";
import {
  getBrowserLanguageOrDefault,
  isValidLangPref,
} from "../../../utils/languageUtils";

const LangPrefDropdown = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [anchorMore, setAnchorMore] = useState(null);
  const [langDisplay, setLangDisplay] = useState("English");

  const location = useLocation();

  const langMap = {
    en: `🇺🇸 ${t("public.global-labels.locales.english")}`,
    ht: `🇭🇹 ${t("public.global-labels.locales.creole")}`,
    pt: `🇧🇷 ${t("public.global-labels.locales.portuguese")}`,
    es: `🇪🇸 ${t("public.global-labels.locales.spanish")}`,
  };

  const dropdownLangNames = {
    en: "English",
    ht: "Kreyòl",
    pt: "Português",
    es: "Español",
  };

  useEffect(() => {
    // Check if current route is a 'public' route
    const isPublicRoute = location.pathname.includes("public");
    if (!isPublicRoute) return;

    // Get query params from current URL
    const params = new URLSearchParams(location.search);
    const urlLangParam = params.get("langPref");
    const storedLangPref = localStorage.getItem("langPref");

    let selectedLang;

    // Priority: URL param > localStorage > browser default
    if (urlLangParam && isValidLangPref(urlLangParam)) {
      selectedLang = urlLangParam;
    } else if (storedLangPref) {
      selectedLang = storedLangPref;
    } else {
      selectedLang = getBrowserLanguageOrDefault();
    }

    if (urlLangParam || !storedLangPref) {
      localStorage.setItem("langPref", selectedLang);
    }

    // Update i18n if language changed
    if (selectedLang !== language) {
      changeLanguage(selectedLang);
    }

    // Update or remove 'langPref' query param based on language
    if (selectedLang !== "en") {
      params.set("langPref", selectedLang);
    } else {
      params.delete("langPref");
    }

    // Update the browser history
    const newUrl = params.toString()
      ? `${location.pathname}?${params.toString()}`
      : location.pathname;

    window.history.replaceState({}, "", newUrl);
  }, [location, language, changeLanguage]);

  // Determine if the language menu should be open
  const open = Boolean(anchorMore);

  // Handle click to open language menu
  const handleClickMore = (event) => {
    setAnchorMore(event.currentTarget);
  };

  // Close language menu
  const handleCloseMore = () => setAnchorMore(null);

  const debouncedLogLanguagePref = useDebouncedCallback((lang, source) => {
    logLanguagePref(lang, source);
  }, 3000);

  // Change language and update localStorage and URL
  const handleChangeLanguage = (lang) => {
    changeLanguage(lang);
    localStorage.setItem("langPref", lang);

    const url = new URL(window.location.href);

    // Update or remove 'langPref' query param based on route and language
    if (url.pathname.includes("public")) {
      if (lang !== "en") {
        url.searchParams.set("langPref", lang);
      } else {
        url.searchParams.delete("langPref");
      }
      window.history.replaceState({}, "", url.toString());
    }

    // Update displayed language
    setLangDisplay(dropdownLangNames[lang]);
  };

  return (
    <div className="lang-pref-dropdown">
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClickMore}
        startIcon={<LanguageIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ color: "var(--color-text-1)" }}
      >
        <Typography variant="navLinks">
          {langDisplay === undefined ? "English" : dropdownLangNames[language]}
        </Typography>
      </Button>

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorMore}
        open={open}
        onClose={handleCloseMore}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box>
          {Object.keys(langMap).map((lang) => (
            <MenuItem
              key={lang}
              variant="navLinks"
              onClick={() => {
                handleChangeLanguage(lang);
                handleCloseMore();
                debouncedLogLanguagePref(lang, "user_select");
              }}
            >
              {langMap[lang]}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </div>
  );
};

export default LangPrefDropdown;
