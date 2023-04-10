import React from "react";
import { Fade } from "@mui/material";

export const HeatPumpFade = ({ children, show }) => {
  return show && <Fade in={show}>{children}</Fade>;
};
