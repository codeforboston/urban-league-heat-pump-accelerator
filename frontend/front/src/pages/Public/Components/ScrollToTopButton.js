import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/material/styles";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ScrollTopBtn = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: "1000",
    borderRadius: "50%",
    background: "var(--bgColor-1)",
    color: "var(--color-text-2)",
    width: "40px",
    height: "40px",
    boxShadow: "var(--box-shadow-3)",
    transition: "opacity 500ms ease-in-out",
    opacity: 0,
    "&:hover": {
      cursor: "pointer",
    },
    ".show &": {
      opacity: 1,
    },
  }));

  const handleScroll = () => {
    setIsVisible(window.pageYOffset > 500);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Stack
      id="scrollToTopBtn"
      className={isVisible && "show"}
      onClick={handleClick}
    >
      <ScrollTopBtn>
        <ArrowForwardIosIcon sx={{ transform: "rotate(-90deg)" }} />
      </ScrollTopBtn>
    </Stack>
  );
};

export default ScrollToTopButton;
