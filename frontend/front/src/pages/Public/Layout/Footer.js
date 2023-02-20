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
    width: "40%",
  },
  "& .footer-links-wrapper": {
    width: "28%",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-between",
  },
  "& .footer-links": {
    display: "flex",
    flexDirection: "column",
    gap: "34px",
    alignItems: "center",
    // alignItems: "baseline",
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "flex-end",
  },
  "& .footer-contact-wrapper": {
    width: "28%",
    display: "flex",
    flexDirection: "column",
    gap: "34px",
    alignItems: "center",
  },
  [theme.breakpoints.down("md")]: {
    "& .footer-links-wrapper": {
      // flexDirection: "column",
      // alignItems: "center",
    },
    "& .footer-links": {
      // flexDirection: "column",
      // alignItems: "center",
      // gap: "12px",
      // marginBottom: "10px",
    },
  },
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper>
      <Toolbar>
        <Grid
          container
          position="static"
          pt={4}
          pb={2}
          sx={
            {
              // alignItems: "space-between",
              // display: "flex",
              // justifyContent: "space-between",
              // textAlign: "center",
            }
          }
        >
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

          <Grid item sx={{ width: "2%" }} pl={2}>
            <Divider orientation="vertical" light="true" />
          </Grid>

          <Grid item className="footer-links-wrapper">
            <Box className="footer-links">
              <Button
                component={Link}
                size="medium"
                sx={{ color: "var(--color-text-2)", width: "auto" }}
                to="survey"
              >
                Take The Survey
              </Button>
              <ButtonGetPump variant="getpumpOutlined" />
              <Button
                component={Link}
                size="medium"
                sx={{ color: "var(--color-text-2)", width: "auto" }}
                to="about"
              >
                Learn More About Us
              </Button>
            </Box>
          </Grid>

          <Grid item sx={{ width: "2%" }} textAlign="left">
            <Divider orientation="vertical" light="true" textAlign="left" />
          </Grid>

          <Grid item className="footer-contact-wrapper">
            <Box>
              <Typography variant="navLinks" pt={1}>
                CONTACT US
              </Typography>
              <Typography variant="navLinks" pt={1}>
                <LocationOnIcon /> 1 City Hall Square, Boston, MA 02201
              </Typography>
              <Typography variant="navLinks" pt={1}>
                <LocalPhoneIcon /> 617-635-4500
              </Typography>
              <Typography variant="navLinks" pt={1}>
                <EmailIcon /> email@email.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </FooterWrapper>
  );
};

export default Footer;
