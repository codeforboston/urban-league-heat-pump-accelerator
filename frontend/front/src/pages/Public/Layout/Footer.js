import * as routes from "../../../routing/routes";
import { useTranslation } from "react-i18next";
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
import logoHeatPump from "../../../assets/images/bhpa-logos/bhpa-logo300px.png";
import { styled } from "@mui/material/styles";

const getFooterItems = () => ({
  aboutBHPA: {
    link: "about-us",
    value: "public.global-labels.learn-more.items.about-bhpa",
  },
  aboutUs: {
    link: "about-heat-pump",
    value: "public.global-labels.learn-more.items.about-us",
  },
  benefitsHeatPumps: {
    link: "benefits-heat-pump",
    value: "public.global-labels.learn-more.items.benefits-heat-pumps",
  },
  getInvolved: {
    link: "get-involved",
    value: "public.global-labels.get-involved",
  },
  survey: {
    link: "survey",
    value: "public.global-labels.survey",
  },
  testimonials: {
    link: "testimonial-section",
    value: "public.global-labels.learn-more.items.testimonials",
  },
});

const FooterWrapper = styled("div")(({ theme }) => ({
  background: "var(--bgColor-2)",
  color: "var(--color-text-1)",
  position: "relative",
  "& .subtitle-footer": {
    fontWeight: "700",
    textDecoration: "none",
  },
}));

const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const footerItems = getFooterItems();

  return (
    <FooterWrapper sx={{ px: { xl: "18%" } }}>
      <Toolbar>
        <Grid
          container
          position="static"
          pt={5}
          pb={2}
          sx={{
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Grid
            item
            justifyContent="center"
            alignItems="flex-start"
            sx={{ display: { xs: "none", md: "flex" }, pr: { md: 1 } }}
            md={3}
          >
            <Link to="" onClick={() => window.scrollTo(0, 0)}>
              <Box
                component="img"
                src={logoHeatPump}
                className="logo"
                alt="logo"
                sx={{
                  width: "100%",
                  maxWidth: "300px",
                  minWidth: "150px",
                }}
              />
            </Link>
          </Grid>

          <Grid
            item
            sx={{
              display: { xs: "block", md: "none" },
            }}
            xs={12}
          >
            <ButtonGetPump />
          </Grid>

          {/* LEARN MORE */}
          <Grid
            item
            sx={{
              pt: { xs: 2, md: 0 },
              px: { md: 2 },
            }}
            xs={12}
            md={3}
          >
            <List variant="caption">
              <Typography className="subtitle-footer" pb={1}>
                {t("public.global-labels.learn-more.value")}
              </Typography>
              {Object.keys(footerItems).map((item) => (
                <ListItem key={item} sx={{ pt: { xs: 0, md: 0 }, px: 0 }}>
                  <ListItemButton
                    sx={{
                      py: 0,
                      px: 0,
                      textAlign: { xs: "center", md: "left" },
                    }}
                    component={item === "testimonials" ? "button" : Link}
                    to={item === "testimonials" ? null : footerItems[item].link}
                    onClick={
                      item === "Our Partners" || item === "testimonials"
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
                      primary={t(footerItems[item].value)}
                      sx={{
                        color: "var(--color-text-1)",
                      }}
                      primaryTypographyProps={{
                        fontWeight: "300",
                        textTransform: "capitalize",
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
              pt: { xs: 1, md: 0 },
              px: { md: 2 },
              borderLeft: { md: "1px solid var(--accent-2)" },
              pl: { md: 4 },
            }}
            xs={12}
            md={3}
          >
            <List variant="caption">
              <Typography className="subtitle-footer" pb={1}>
                {t("public.footer.legal")}
              </Typography>

              <ListItem sx={{ py: { xs: 0, md: 0 }, px: 0 }}>
                <ListItemButton
                  sx={{
                    py: 0,
                    px: 0,
                    textAlign: { xs: "center", md: "left" },
                    fontWeight: "300",
                  }}
                  component={Link}
                  to="privacy-policy"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <ListItemText
                    primary={t("public.footer.privacy-and-data-policy")}
                    sx={{
                      color: "var(--color-text-1)",
                    }}
                    primaryTypographyProps={{
                      fontWeight: "300",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>

          {/* CONTACT US   */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              pt: { xs: 2, md: 0 },
              px: { md: 2 },
              borderLeft: { md: "1px solid var(--accent-2)" },
              pl: { md: 4 },
            }}
          >
            <>
              <Typography className="subtitle-footer" pb={1}>
                {t("public.footer.contact-us")}
              </Typography>
              <Box>
                <Box
                  variant="navLinks"
                  pt={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                    py: { xs: 1, md: 1 },
                  }}
                >
                  <EmailIcon sx={{ mr: 1 }} />
                  <a
                    href="mailto:help@bostonhpa.org"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight: "300",
                    }}
                  >
                    help@bostonhpa.org
                  </a>
                </Box>

                <Box
                  mt={2}
                  sx={{
                    display: { xs: "none", md: "block" },
                  }}
                >
                  <ButtonGetPump />
                </Box>
                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    py: { xs: 0, md: 2 },
                  }}
                >
                  <ButtonWhite to={routes.LOGIN_ROUTE}>
                    <LockOutlinedIcon sx={{ mr: 1 }} />
                    {t("public.footer.member-login")}
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
            sx={{ pt: { xs: 4 }, display: { xs: "block", md: "none" } }}
          >
            <ButtonWhite to={routes.LOGIN_ROUTE}>
              <LockOutlinedIcon sx={{ mr: 1 }} />
              {t("public.footer.member-login")}
            </ButtonWhite>
          </Grid>

          {/* COPYRIGHT */}
          <Grid
            item
            sx={{ display: { xs: "block", md: "none" }, pt: { xs: 4 } }}
            xs={12}
          >
            <Link to="" onClick={() => window.scrollTo(0, 0)}>
              <Box
                component="img"
                src={logoHeatPump}
                className="logo"
                alt="logo"
                sx={{
                  width: "100%",
                  maxWidth: "300px",
                  minWidth: "150px",
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
              {t("public.global-labels.all-rights-reserved")}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </FooterWrapper>
  );
};

export default Footer;
