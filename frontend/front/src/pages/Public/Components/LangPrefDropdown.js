import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Menu, MenuItem, Fade, Button, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";
import { logLanguagePref } from "../../../features/newrelic";
import { useDebouncedCallback } from "use-debounce";
import { getBrowserLanguageOrDefault } from "../../../utils/languageUtils";

const LangPrefDropdown = ({ variant }) => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [anchorMore, setAnchorMore] = useState(null);
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
    // Only run for navbar variant
    if (variant !== "navbar") return;

    // Check if current route is a 'public' route
    const isPublicRoute = location.pathname.includes("public");
    if (!isPublicRoute) return;

    // Get query params from current URL
    const params = new URLSearchParams(location.search);
    const langPref =
      localStorage.getItem("langPref") || getBrowserLanguageOrDefault();

    if (!localStorage.getItem("langPref")) {
      localStorage.setItem("langPref", langPref);
    }

    // Update i18n if language changed
    if (langPref !== language) {
      changeLanguage(langPref);
    }

    // Update or remove 'langPref' query param based on language
    if (langPref !== "en") {
      params.set("langPref", langPref);
    } else {
      params.delete("langPref");
    }

    // Update the browser history
    const newUrl = params.toString()
      ? `${location.pathname}?${params.toString()}`
      : location.pathname;

    window.history.replaceState({}, "", newUrl);
  }, [location, language, changeLanguage, variant]);

  // Determine if the language menu should be open
  const open = Boolean(anchorMore);

  // Handle click to open language menu
  const handleClickMore = (event) => {
    setAnchorMore(event.currentTarget);
  };

  // Close language menu
  const handleCloseMore = () => {
    setAnchorMore(null);
  };

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

    handleCloseMore();
  };

  const analyticsSource =
    variant === "navbar" ? "hamburger_menu" : "public_survey_dropdown";

  if (variant === "navbar") {
    return (
      <div className="lang-pref-dropdown">
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickMore}
          startIcon={<LanguageIcon />}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ color: "var(--color-text-1)" }}
        >
          <Typography variant="navLinks">
            {dropdownLangNames[language] || "English"}
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
          {Object.keys(langMap).map((lang) => (
            <MenuItem
              key={lang}
              variant="navLinks"
              onClick={() => {
                handleChangeLanguage(lang);
                debouncedLogLanguagePref(lang, analyticsSource);
              }}
            >
              {langMap[lang]}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <Button
        id="public-survey-lang-dropdown"
        aria-controls={open ? "public-survey-lang-pref-dropdown" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickMore}
        startIcon={<LanguageIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          textTransform: "none",
          backgroundColor: "var(--bgColor-1)",
          color: "var(--color-text-2)",
          borderRadius: "24px",
          padding: "8px 16px",
          minHeight: "44px",
          fontFamily: "var(--font-family-1)",
          fontSize: "0.875rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          outline: "var(--color-text-2) solid 2px",
        }}
      >
        <span>{dropdownLangNames[language] || "English"}</span>
      </Button>

      <Menu
        id="public-survey-lang-pref-dropdown"
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
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "var(--color-text-2)",
            },
          },
        }}
        sx={{ mt: 1 }}
      >
        {Object.keys(langMap).map((lang) => (
          <MenuItem
            key={lang}
            onClick={() => {
              handleChangeLanguage(lang);
              debouncedLogLanguagePref(lang, analyticsSource);
            }}
            sx={{
              color: "var(--color-text-2)",
              fontFamily: "var(--font-family-1)",
              fontSize: "0.875rem",
            }}
          >
            {langMap[lang]}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LangPrefDropdown;
