import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Menu, MenuItem, Fade, Button, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";

const LangPrefDropdown = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [anchorMore, setAnchorMore] = useState(null);
  const [langDisplay, setLangDisplay] = useState("English");
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const location = useLocation();

  const langMap = {
    "en-us": `🇺🇸 ${t("public.global-labels.locales.english")}`,
    "ht-cr": `🇭🇹 ${t("public.global-labels.locales.creole")}`,
    "pt-br": `🇧🇷 ${t("public.global-labels.locales.portuguese")}`,
    "es-us": `🇪🇸 ${t("public.global-labels.locales.spanish")}`,
  };

  useEffect(() => {
    // Get query params from current URL
    const params = new URLSearchParams(window.location.search);
    let queryLang = params.get("langPref");
    // Check if current route is a 'public' route
    const isPublicRoute = window.location.pathname.includes("public");

    if (isPublicRoute) {
      // Get language preference from localStorage or default to 'en-us'
      queryLang = localStorage.getItem("langPref") || "en-us";
      const url = new URL(window.location.href);

      // Update or remove 'langPref' query param based on language
      if (queryLang !== "en-us") {
        url.searchParams.set("langPref", queryLang);
      } else {
        url.searchParams.delete("langPref");
      }

      // Update the browser history
      window.history.replaceState({ path: url.toString() }, "", url.toString());
    }

    // Update language state if queryLang is different
    if (queryLang && queryLang !== currentLanguage) {
      setCurrentLanguage(queryLang);
      changeLanguage(queryLang);
      localStorage.setItem("langPref", queryLang);
    }
  }, [location, currentLanguage, changeLanguage]);

  // Determine if the language menu should be open
  const open = Boolean(anchorMore);

  // Handle click to open language menu
  const handleClickMore = (event) => {
    setAnchorMore(event.currentTarget);
  };

  // Close language menu
  const handleCloseMore = () => setAnchorMore(null);

  // Change language and update localStorage and URL
  const handleChangeLanguage = (lang, display) => {
    setCurrentLanguage(lang);
    changeLanguage(lang);
    localStorage.setItem("langPref", lang);

    const url = new URL(window.location.href);

    // Update or remove 'langPref' query param based on route and language
    if (url.pathname.includes("public")) {
      if (lang !== "en-us") {
        url.searchParams.set("langPref", lang);
      } else {
        url.searchParams.delete("langPref");
      }
      window.history.replaceState({}, "", url.toString());
    }

    // Update displayed language
    setLangDisplay(langMap[lang]);
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
          {langDisplay === undefined ? "English" : language}
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
                handleChangeLanguage(lang, langMap[lang]);
                handleCloseMore();
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
