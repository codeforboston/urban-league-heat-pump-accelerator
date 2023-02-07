import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import clsx from "clsx";

const AnimatedBoxScroll = ({ animation, id, children, ...props }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(id);
      if (!element) return;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const screenPosition = window.innerHeight;

      if (elementPosition < screenPosition) {
        setTimeout(() => setIsScrolled(true), 5000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [id, isScrolled]);

  const classes = clsx(animation, {
    animate__animated: isScrolled,
  });

  return (
    <Box className={classes} {...props}>
      {children}
    </Box>
  );
};

export default AnimatedBoxScroll;
