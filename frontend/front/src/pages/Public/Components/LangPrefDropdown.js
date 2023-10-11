import React, { useState } from "react";
import { Box, Menu, MenuItem, Fade, Button, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

const langsPref = {
  English: {
    lang: "en-us",
  },
  French: {
    lang: "fr-ht",
  },
  Spanish: {
    lang: "es",
  },
  Portuguese: {
    lang: "pt-br",
  },
};

const LangPrefDropdown = ({ langPref, setLangPref }) => {
  const [anchorMore, setAnchorMore] = useState(null);
  const open = Boolean(anchorMore);

  const handleClickMore = (event) => {
    setAnchorMore(event.currentTarget);
  };

  const handleCloseMore = () => setAnchorMore(null);

  const handleLangSelect = (selectedLang) => {
    setLangPref(selectedLang);
    handleCloseMore();
  };

  return (
    <div className="lang-pref-dropdown">
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClickMore}
        startIcon={<LanguageIcon />}
        sx={{ color: "var(--color-text-1)" }}
      >
        <Typography variant="navLinks">
          {langsPref[langPref] ? langPref : "English"}
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
          {Object.keys(langsPref).map((lang, index) => (
            <MenuItem
              key={index}
              variant="navLinks"
              onClick={() => handleLangSelect(langsPref[lang].lang)}
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
