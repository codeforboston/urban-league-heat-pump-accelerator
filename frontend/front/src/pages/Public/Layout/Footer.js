import React from "react";
import { Box, Button, Grid, Toolbar, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import ButtonGetPump from "../Components/ButtonGetPump";
import logoHeatPump from "../../../assets/images/logoHeatPump.png";
import { styled } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

const FooterWrapper = styled("div")(({ theme }) => ({
  background: "var(--bgColor-2)",
  color: "var(--color-text-2)",
  marginTop: "128px",
  position: "relative",
  "& .footer-logo-wrapper": {
    width: "36%",
  },
  "& .footer-links-wrapper": {
    width: "30%",
  },
  "& .footer-links": {
    display: "flex",
    flexDirection: "column",
    gap: "34px",
    alignItems: "center",
  },
  "& .footer-contact-wrapper": {
    width: "30%",
  },
  "& .footer-contact": {
    height: "169px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  [theme.breakpoints.down("md")]: {
    "& .footer-links-wrapper": {},
    "& .footer-links": {},
  },
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper>
      <Toolbar>
        <Grid container position="static" pt={4} pb={2}>
          <Grid item className="footer-logo-wrapper">
            <Grid
              component="img"
              container
              alt="logo"
              src={logoHeatPump}
              sx={{
                mt: 6,

                width: "auto",
              }}
            />
            <Divider light="true" sx={{ my: 2 }} />
            <Typography variant="caption" pt={1}>
              © {currentYear} | Boston Heat Pump Accelerator.
            </Typography>
            <Typography align="center" variant="caption" pt={1}>
              All logos and trademarks are copyright their respective owners.
            </Typography>
          </Grid>

          <Grid item sx={{ width: "auto" }} pl={2}>
            <Divider orientation="vertical" light="true" />
          </Grid>

          <Grid item className="footer-links-wrapper">
            <Box className="footer-links">
              <ButtonGetPump variant="getpump" />
              <Button
                component={Link}
                size="medium"
                sx={{ color: "var(--color-text-2)", width: "auto" }}
                to="about"
              >
                Learn More About Us
              </Button>
              <Button
                component={Link}
                size="medium"
                sx={{ color: "var(--color-text-2)", width: "auto" }}
                to="survey"
              >
                Take The Survey
              </Button>
            </Box>
          </Grid>

          <Grid item sx={{ width: "auto" }} textAlign="left">
            <Divider orientation="vertical" light="true" textAlign="left" />
          </Grid>

          <Grid item className="footer-contact-wrapper" ml={2}>
            <Typography variant="navLinks" pt={1} sx={{ margin: "0 auto" }}>
              CONTACT US
            </Typography>
            <Box className="footer-contact">
              <Typography
                variant="navLinks"
                pt={1}
                sx={{ display: "flex", alignItems: "baseline" }}
              >
                <LocationOnIcon sx={{ mr: 2 }} /> 1 City Hall Square, Boston, MA
                02201
              </Typography>
              <Typography
                variant="navLinks"
                pt={1}
                sx={{ display: "flex", alignItems: "baseline" }}
              >
                <LocalPhoneIcon sx={{ mr: 2 }} /> 617-635-4500
              </Typography>
              <Typography
                variant="navLinks"
                pt={1}
                sx={{ display: "flex", alignItems: "baseline" }}
              >
                <EmailIcon sx={{ mr: 2 }} /> email@email.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </FooterWrapper>
  );
};

export default Footer;
