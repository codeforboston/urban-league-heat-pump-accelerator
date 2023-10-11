import React, { useState } from "react";
import { Box, Menu, MenuItem, Fade, Button, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import i18next from "i18next";

const langsPref = {
  English: {
    lang: "en-us",
  },
  French: {
    lang: "fr-ht",
  },
  Portuguese: {
    lang: "pt-br",
  },
  Spanish: {
    lang: "es-xm",
  },
};

const LangPrefDropdown = ({ setLangPref = "en-us" }) => {
  const [anchorMore, setAnchorMore] = useState(null);
  const open = Boolean(anchorMore);

  const handleClickMore = (event) => {
    setAnchorMore(event.currentTarget);
  };

  const handleCloseMore = () => setAnchorMore(null);

  const handleLangSelect = (selectedLang) => {
    setLangPref(selectedLang);
    handleCloseMore();

    // Define the language for i18next
    i18next.changeLanguage(langsPref[selectedLang].lang);
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
          {langsPref[setLangPref] ? langsPref[setLangPref].lang : "English"}
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
              onClick={() => handleLangSelect(lang)}
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
