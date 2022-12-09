import React from "react";
import { Typography, Stack } from "@mui/material";
import strings from "../constants";
import { format } from "date-fns";

const Footer = () => {
  return (
    <Stack
      justifyContent="center"
      p={4}
      sx={{ bgcolor: "footer.main", color: "#FFF" }}
    >
      <Typography align="center">
        © {format(new Date(), "yyyy")} Copyrights: {strings.appName}
      </Typography>
    </Stack>
  );
};

export default Footer;
