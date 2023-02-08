import React from "react";
import { Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ButtonGetPump from "../Components/ButtonGetPump";
import logoHeatPump from "../../../assets/images/logoHeatPump.png";
import { styled } from "@mui/material/styles";

const FooterWrapper = styled("div")(({ theme }) => ({
  background: "var(--bgColor-2)",
  color: "var(--color-text-2)",
  marginTop: "128px",
  position: "relative",
  "& .footer-links-wrapper": {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  "& .footer-links": {
    alignItems: "baseline",
    display: "flex",
    flexDirection: "row",
    gap: "34px",
    justifyContent: "flex-end",
  },
  [theme.breakpoints.down("md")]: {
    "& .footer-links-wrapper": {
      flexDirection: "column",
      alignItems: "center",
    },
    "& .footer-links": {
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
      marginBottom: "10px",
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
          pb={8}
          sx={{
            alignItems: "space-between",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
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
          <Grid item>
            <Grid
              component="img"
              container
              className="logo"
              alt="logo"
              src={logoHeatPump}
              sx={{
                margin: "0 auto",
                mt: 6,
                width: "auto",
              }}
            />
            <Typography align="center" pt={1}>
              © {currentYear} | All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </FooterWrapper>
  );
};

export default Footer;
