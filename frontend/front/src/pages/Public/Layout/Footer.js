import React from "react";
import { Typography, Stack, Box } from "@mui/material";
import strings from "../Assets/constants";
import ButtonGetPump from "../Components/ButtonGetPump";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box spacing={4} pt={4} sx={{ bgcolor: "footer.main", color: "#FFF" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ButtonGetPump />
      </Box>
      <Stack justifyContent="center" p={4} sx={{ color: "main" }}>
        <Typography align="center">
          © {currentYear} Copyrights: {strings.appName}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
