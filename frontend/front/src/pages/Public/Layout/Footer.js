import React from "react";
import { Typography, Stack } from "@mui/material";
import strings from "../Assets/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Stack justifyContent="center" p={4} sx={{ color: "main" }}>
      <Typography align="center">
        © {currentYear} Copyrights: {strings.appName}
      </Typography>
    </Stack>
  );
};

export default Footer;
