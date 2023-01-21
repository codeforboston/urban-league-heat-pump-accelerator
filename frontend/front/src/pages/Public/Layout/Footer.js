import React from "react";
import { Typography, Stack, Box, Button, Grid, Divider } from "@mui/material";
import strings from "../Assets/constants";
import ButtonGetPump from "../Components/ButtonGetPump";
import { Link } from "react-router-dom";
import Partners from "../Components/Partners";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      pt={4}
      sx={{
        bgcolor: "footer.bgColor",
        color: "#FFF",
      }}
    >
      <Grid container spacing={4} sx={{ alignItems: "center" }}>
        <Grid item lg={9} sx={{ pb: 6, mx: 4 }}>
          <Partners />
        </Grid>
        <Divider
          orientation="vertical"
          variant="fullWidth"
          sx={{ mt: 4 }}
          color="gray"
          flexItem
        />
        <Grid item lg={2} alignItems="center">
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              component={Link}
              to="survey"
              sx={{ color: "#fff", width: "200px" }}
              size="medium"
            >
              Take The Survey
            </Button>
            <Button
              component={Link}
              to="about"
              sx={{ color: "#fff", width: "200px" }}
              size="medium"
            >
              Learn More About Us
            </Button>

            <ButtonGetPump />
          </Stack>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Stack justifyContent="center" p={4} sx={{ color: "main" }}>
            <Typography align="center">
              © {currentYear} Copyrights: {strings.appName}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
