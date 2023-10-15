import React, { useState } from "react";
import { Box, Menu, MenuItem, Fade, Button, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";

const LangPrefDropdown = () => {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [anchorMore, setAnchorMore] = useState(null);
  const [langDisplay, setLangDisplay] = useState("English"); // ["English", "Portuguese", "Spanish", "French"]
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const open = Boolean(anchorMore);

  const handleClickMore = (event) => {
    setAnchorMore(event.currentTarget);
  };

  const handleCloseMore = () => setAnchorMore(null);

  const langsPref = {
    English: "en",
    Portuguese: "pt",
    Spanish: "es",
    French: "fr",
  };

  const handleChangeLanguage = (lang, display) => {
    setCurrentLanguage(lang);
    changeLanguage(lang);
    console.log(lang);
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
        <Typography variant="navLinks">{langDisplay}</Typography>
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
              onClick={() => handleChangeLanguage(langsPref[lang], lang)}
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
