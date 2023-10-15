import React, { useState, useEffect } from "react";
import { Box, Menu, MenuItem, Fade, Button, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";

const LangPrefDropdown = () => {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [anchorMore, setAnchorMore] = useState(null);
  const [langDisplay, setLangDisplay] = useState("English");
  const [currentLanguage, setCurrentLanguage] = useState(language);

  useEffect(() => {
    // Read the langPref from localStorage
    const storedLangPref = localStorage.getItem("langPref");

    // If it exists, set the language
    if (storedLangPref) {
      changeLanguage(storedLangPref);
    } else {
      // If it doesn't exist, set it to 'en-us'
      localStorage.setItem("langPref", "en-us");
    }

    const langMap = {
      "en-us": "English",
      "pt-br": "Portuguese",
      "es-416": "Spanish",
      "fr-ht": "French",
    };

    setLangDisplay(langMap[language]);
  }, [language]);

  const open = Boolean(anchorMore);

  const handleClickMore = (event) => {
    setAnchorMore(event.currentTarget);
  };

  const handleCloseMore = () => setAnchorMore(null);

  const langsPref = {
    English: "en-us",
    Portuguese: "pt-br",
    Spanish: "es-416",
    French: "fr-ht",
  };

  const handleChangeLanguage = (lang, display) => {
    setCurrentLanguage(lang);
    changeLanguage(lang);

    // Update localStorage
    localStorage.setItem("langPref", lang);

    // Update URL query param
    if (lang !== "en-us") {
      const url = new URL(window.location.href);
      url.searchParams.set("langPref", lang);
      window.history.replaceState({}, "", url);
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete("langPref");
      window.history.replaceState({}, "", url);
    }

    setLangDisplay(display);
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
          {langDisplay === undefined ? "English" : langDisplay}
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
      >
        <Box>
          {Object.keys(langsPref).map((lang) => (
            <MenuItem
              key={lang}
              variant="navLinks"
              onClick={() => {
                handleChangeLanguage(langsPref[lang], lang);
                handleCloseMore();
              }}
            >
              {lang}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </div>
  );
};

export default LangPrefDropdown;
