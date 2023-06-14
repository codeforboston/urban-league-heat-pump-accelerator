import * as routes from "../../../routing/routes";

import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import ButtonGetPump from "../Components/Button/ButtonGetPump";
import ButtonWhite from "../Components/Button/ButtonWhite";
import EmailIcon from "@mui/icons-material/Email";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import logoHeatPump from "../../../assets/images/bhpa-logos/bhpa-logo300px.png";
import { styled } from "@mui/material/styles";

const footerItems = {
  "About BHPA": { link: "about-us" },
  "About Heat Pumps": { link: "about-heat-pump" },
  "Benefits of Heat Pumps": { link: "benefits-heat-pump" },
  "Get Involved": { link: "get-involved" },
  "Our Partners": { link: "our-partners-section" },
  Testimonials: { link: "testimonial-section" },
};

const FooterWrapper = styled("div")(({ theme }) => ({
  background: "var(--bgColor-2)",
  color: "var(--color-text-1)",
  position: "relative",
  "& .subtitle-footer": {
    fontWeight: "bold",
    textDecoration: "underline",
  },
}));

const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper sx={{ px: { xl: "18%" } }}>
      <Toolbar>
        <Grid
          container
          position="static"
          pt={5}
          pb={2}
          sx={{
            textAlign: { xs: "center", lg: "left" },
          }}
        >
          <Grid
            item
            justifyContent="center"
            alignItems="flex-start"
            sx={{ display: { xs: "none", lg: "flex" }, pr: { lg: 1 } }}
            lg={3}
          >
            <Link to="" onClick={() => window.scrollTo(0, 0)}>
              <Box
                component="img"
                alt="logo"
                src={logoHeatPump}
                sx={{ maxWidth: "300px" }}
              />
            </Link>
          </Grid>

          <Grid
            item
            sx={{
              display: { xs: "block", lg: "none" },
            }}
            xs={12}
          >
            <ButtonGetPump />
          </Grid>

          {/* BENEFITS OF HEAT PUMPS */}
          <Grid
            item
            sx={{
              pt: { xs: 2, lg: 0 },
              px: { lg: 2 },
            }}
            xs={12}
            lg={3}
          >
            <List variant="caption">
              <Typography className="subtitle-footer" pb={1}>
                Learn More
              </Typography>
              {Object.keys(footerItems).map((item) => (
                <ListItem key={item} sx={{ pt: { xs: 0, lg: 0 }, px: 0 }}>
                  <ListItemButton
                    sx={{
                      py: 0,
                      px: 0,
                      textAlign: { xs: "center", lg: "left" },
                    }}
                    component={
                      item === "Our Partners" || item === "Testimonials"
                        ? "button"
                        : Link
                    }
                    to={
                      item === "Our Partners" || item === "Testimonials"
                        ? null
                        : footerItems[item].link
                    }
                    onClick={
                      item === "Our Partners" || item === "Testimonials"
                        ? () => {
                            navigate("/public");
                            setTimeout(() => {
                              const target = document.getElementById(
                                footerItems[item].link
                              );
                              if (target) {
                                target.scrollIntoView({ behavior: "smooth" });
                              }
                            }, 100);
                          }
                        : () => window.scrollTo(0, 0)
                    }
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
            sx={{
              pt: { xs: 1, lg: 0 },
              px: { lg: 2 },
              borderLeft: { lg: "1px solid var(--accent-2)" },
              pl: { lg: 4 },
            }}
            xs={12}
            lg={3}
          >
            <List variant="caption">
              <Typography className="subtitle-footer" pb={1}>
                Legal
              </Typography>

              <ListItem sx={{ py: { xs: 0, lg: 0 }, px: 0 }}>
                <ListItemButton
                  sx={{ py: 0, px: 0, textAlign: { xs: "center", lg: "left" } }}
                  component={Link}
                  to="privacy-policy"
                  onClick={() => window.scrollTo(0, 0)}
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

          {/* GET IN TOUCH */}
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              pt: { xs: 2, lg: 0 },
              px: { lg: 2 },
              borderLeft: { lg: "1px solid var(--accent-2)" },
              pl: { lg: 4 },
            }}
          >
            <>
              <Typography className="subtitle-footer">
                Get to Know Us
              </Typography>
              <Box>
                <Box
                  variant="navLinks"
                  sx={{
                    display: "flex",
                    alignItem: "flex-center",
                    justifyContent: { xs: "center", lg: "flex-start" },
                    pt: { xs: 1, lg: 2 },
                  }}
                >
                  <PermPhoneMsgIcon sx={{ mr: 1 }} />
                  <a
                    href="tel:617-635-4500"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    617-635-4500
                  </a>
                </Box>
                <Box
                  variant="navLinks"
                  pt={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", lg: "flex-start" },
                    py: { xs: 1, lg: 1 },
                  }}
                >
                  <EmailIcon sx={{ mr: 1 }} />
                  <a
                    href="mailto:help@bostonhpa.org"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    help@bostonhpa.org
                  </a>
                </Box>

                <Box
                  mt={2}
                  sx={{
                    display: { xs: "none", lg: "block" },
                  }}
                >
                  <ButtonGetPump />
                </Box>
                <Box
                  sx={{
                    display: { xs: "none", lg: "block" },
                    py: { xs: 0, lg: 2 },
                  }}
                >
                  <ButtonWhite to={routes.LOGIN_ROUTE}>
                    <LockOutlinedIcon sx={{ mr: 1 }} />
                    Member Login
                  </ButtonWhite>
                </Box>
              </Box>
            </>
          </Grid>

          {/* LOGIN */}
          <Grid
            item
            xs={12}
            align="center"
            sx={{ pt: { xs: 4 }, display: { xs: "block", lg: "none" } }}
          >
            <ButtonWhite to={routes.LOGIN_ROUTE}>
              <LockOutlinedIcon sx={{ mr: 1 }} />
              Member Login
            </ButtonWhite>
          </Grid>

          {/* COPYRIGHT */}
          <Grid
            item
            sx={{ display: { xs: "block", lg: "none" }, pt: { xs: 4 } }}
            xs={12}
          >
            <Link to="" onClick={() => window.scrollTo(0, 0)}>
              <Box
                component="img"
                alt="logo"
                src={logoHeatPump}
                sx={{
                  maxWidth: "300px",
                  "@media (max-width: 350px)": {
                    width: "250px",
                  },
                }}
              />
            </Link>
          </Grid>

          <Grid item xs={12} align="center">
            <Divider sx={{ my: 2, backgroundColor: "var(--accent-2)" }} />
            <Typography variant="caption" pt={1}>
              Copyright © {currentYear} | Boston Heat Pump Accelerator. {` `}
            </Typography>
            <Typography align="center" variant="caption" pt={1}>
              All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </FooterWrapper>
  );
};

export default Footer;
