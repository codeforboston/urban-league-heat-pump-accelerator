import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Popover,
} from "@mui/material";
import { Link } from "react-router-dom";
import ButtonGetPump from "../Components/ButtonGetPump";
import logoHeatPump from "../../../assets/images/logoHeatPump.png";
import { styled } from "@mui/material/styles";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LoginPublicView from "../Components/LoginPublicView";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const footerItems = {
  "About B.H.P.A": { link: "learn-more" },
  "Our Partners": { link: "" },
  "F.A.Q": { link: "faq" },
};

const FooterWrapper = styled("div")(({ theme }) => ({
  background: "var(--bgColor-2)",
  color: "var(--color-text-1)",
  marginTop: "128px",
  // position: "relative",
  "& .subtitle-footer": {
    fontWeight: "bold",
    textDecoration: "underline",
  },
  "& .footer-wrapper": {
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // gap: "20px",
  },
  "& .footer-logo-wrapper": {
    //     width: "36%",
  },
  "& .footer-links-wrapper": {
    //     width: "30%",
  },
  "& .footer-links": {
    //     display: "flex",
    //     flexDirection: "column",
    //     gap: "34px",
    //     alignItems: "center",
  },
  "& .footer-contact-wrapper": {
    //     width: "30%",
  },
  "& .footer-contact": {
    //     height: "169px",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "flex-start",
    //     justifyContent: "space-between",
  },
  [theme.breakpoints.down("lg")]: {
    "& .footer-wrapper": {
      //       flexDirection: "column-reverse",
      //       justifyContent: "center",
      //       alignItems: "center",
      //       gap: "20px",
    },
  },
}));

const Footer = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper>
      <Toolbar>
        <Grid
          container
          position="static"
          className="footer-wrapper"
          pt={4}
          pb={2}
          sx={{ textAlign: "center" }}
        >
          <Grid
            item
            className="footer-logo-wrapper"
            sx={{ display: { xs: "none", lg: "block" } }}
          >
            <Link to="" onClick={() => window.scrollTo(0, 0)}>
              <Box component="img" container alt="logo" src={logoHeatPump} />
            </Link>
          </Grid>

          <Grid
            item
            sx={{
              width: "auto",
              display: { xs: "none", lg: "block" },
            }}
            xs={12}
            lg={4}
          >
            <Divider orientation="vertical" light="true" />
          </Grid>

          <Grid
            item
            sx={{ display: { xs: "block", lg: "none" } }}
            xs={12}
            lg={4}
          >
            <ButtonGetPump variant="getpump" />
          </Grid>

          {/* LEARN */}
          <Grid
            item
            className="footer-links-wrapper"
            sx={{ display: { xs: "block", lg: "none" }, pt: { xs: 3 } }}
            xs={12}
            lg={4}
          >
            <List variant="caption">
              <Typography className="subtitle-footer">LEARN</Typography>
              {Object.keys(footerItems).map((item) => (
                <ListItem key={item} sx={{ py: 0 }}>
                  <ListItemButton
                    sx={{ py: 0, textAlign: "center" }}
                    component={Link}
                    to={footerItems[item].link}
                  >
                    <ListItemText
                      primary={item}
                      sx={{
                        color: "var(--color-text-1)",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* LEGAL */}
          <Grid
            item
            sx={{ display: { xs: "block", lg: "none" }, pt: { xs: 1 } }}
            xs={12}
            lg={4}
          >
            <List variant="caption">
              <Typography className="subtitle-footer">LEGAL</Typography>

              <ListItem sx={{ py: 0 }}>
                <ListItemButton
                  sx={{ py: 0, textAlign: "center" }}
                  component={Link}
                  to="privacy-policy"
                >
                  <ListItemText
                    primary="Privacy & Data Policy"
                    sx={{
                      color: "var(--color-text-1)",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>

          <Grid
            item
            sx={{ width: "auto", display: { xs: "none", lg: "block" } }}
            textAlign="left"
          >
            <Divider orientation="vertical" light="true" textAlign="left" />
          </Grid>

          <Grid
            item
            className="footer-contact-wrapper"
            sx={{ display: { xs: "block", lg: "none" } }}
            xs={12}
            lg={4}
          >
            <Typography className="subtitle-footer" sx={{ pt: { xs: 2 } }}>
              GET IN TOUCH
            </Typography>
            <Box className="footer-contact">
              <Box variant="navLinks">
                <LocalPhoneIcon sx={{ mr: 1 }} /> 617-635-4500 (Voicemail)
              </Box>
              <Box
                variant="navLinks"
                pt={1}
                // sx={{ display: "flex", alignItems: "baseline" }}
              >
                <EmailIcon sx={{ mr: 1 }} />
                info@bhpa.org
              </Box>
            </Box>
          </Grid>
          {/* LOGIN */}
          <Grid item xs={12} align="center" sx={{ pt: { xs: 4 } }}>
            {/* <Typography className="subtitle-footer" sx={{ pt: { xs: 2 } }}>
              RESTRICTED AREA
            </Typography> */}
            <Button
              aria-describedby={id}
              variant="blackBtn"
              onClick={handleClick}
            >
              <LockOutlinedIcon sx={{ mr: 1 }} /> Member Login
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <LoginPublicView />
            </Popover>
          </Grid>

          {/* COPYRIGHT */}
          <Grid
            item
            className="footer-logo-wrapper"
            sx={{ display: { xs: "block", lg: "none" }, pt: { xs: 4 } }}
            xs={12}
            lg={4}
          >
            <Link to="" onClick={() => window.scrollTo(0, 0)}>
              <Box component="img" container alt="logo" src={logoHeatPump} />
            </Link>
          </Grid>

          <Grid item xs={12} align="center">
            <Divider light="true" sx={{ my: 2 }} />
            <Typography variant="caption" pt={1}>
              © {currentYear} | Boston Heat Pump Accelerator.
            </Typography>
            <Typography align="center" variant="caption" pt={1}>
              All logos and trademarks are copyright their respective owners.
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </FooterWrapper>
  );
};

export default Footer;
