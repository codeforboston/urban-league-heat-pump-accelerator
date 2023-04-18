import React from "react";
import { Slide } from "@mui/material";

export const HeatPumpSlide = ({ children, show }) => {
  return (
    show && (
      <Slide in={show} direction="left">
        {children}
      </Slide>
    )
  );
};
