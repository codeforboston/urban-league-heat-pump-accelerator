import React, { useState, useEffect } from "react";
import { Stack, IconButton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setIsVisible(window.pageYOffset > 500);
    console.log(isVisible);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Stack
      id="scrollToTopBtn"
      className={isVisible ? `showScrollTopBtn show` : "hiddenScrollTopBtn"}
      onClick={handleClick}
    >
      <IconButton
        color="primary"
        aria-label="backTotheTop"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "1000",
        }}
      >
        <ArrowForwardIosIcon sx={{ transform: "rotate(-90deg)" }} />

        <Typography variant="navLinks">Top</Typography>
      </IconButton>
    </Stack>
  );
}

export default ScrollToTopButton;
