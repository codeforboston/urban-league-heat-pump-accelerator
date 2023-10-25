import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
  Stack,
  Typography,
  Grid,
  Menu,
  MenuItem,
  Collapse,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ButtonGetPump from "../Components/Button/ButtonGetPump";
import logoHeatPump from "../../../assets/images/bhpa-logos/bhpa-logo300px.gif";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LangPrefDropdown from "../Components/LangPrefDropdown";

const drawerWidth = "100%";

const getNavbarItems = () => ({
  SURVEY: { link: "survey", value: "public.global-labels.survey" },
  LearnMore: {
    value: "public.global-labels.learn-more.value",
    items: {
      BenefitsofHeatPumps: {
        link: "benefits-heat-pump",
        value: "public.global-labels.learn-more.items.benefits-heat-pumps",
      },
      AboutHeatPumps: {
        link: "about-heat-pump",
        value: "public.global-labels.learn-more.items.about-us",
      },
      Testimonials: {
        link: "testimonial-section",
        value: "public.global-labels.learn-more.items.testimonials",
      },
      AboutBHPA: {
        link: "about-us",
        value: "public.global-labels.learn-more.items.about-bhpa",
      },
    },
  },
  getInvolved: {
    link: "get-involved",
    value: "public.global-labels.get-involved",
  },
});

function Navbar(props) {
  const [anchorMore, setAnchorMore] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMoreMobile, setOpenMoreMobile] = useState(false);

  const { window } = props;
  const { t } = useTranslation();

  const navbarItems = getNavbarItems();

  const navigate = useNavigate();

  const open = Boolean(anchorMore);

  const handleClickMore = (event) => {
    if (event) {
      setAnchorMore(event.currentTarget);
    }
  };
  const handleCloseMore = () => setAnchorMore(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleClickMoreMobile = () => setOpenMoreMobile(!openMoreMobile);

  const handleNavigation = (link) => {
    if (link === "testimonial-section") {
      navigate("/public#testimonial-section");
      setTimeout(() => {
        const target = document.getElementById("testimonial-section");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      navigate(link);
    }
  };

  const desktopNavLink = (navbarItems, item) => (
    <>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickMore}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ color: "var(--color-text-1)" }}
      >
        <Typography variant="navLinks">
          {t(navbarItems[item].value) || item}
        </Typography>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorMore}
        open={open}
        onClose={handleCloseMore}
        TransitionComponent={Fade}
      >
        <Box>
          {Object.keys(navbarItems.LearnMore.items).map((subItem) => (
            <MenuItem
              key={subItem}
              variant="navLinks"
              onClick={() => {
                handleNavigation(navbarItems.LearnMore.items[subItem].link);
                handleCloseMore();
              }}
            >
              {t(navbarItems.LearnMore.items[subItem].value)}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Box sx={{ flexGrow: 1, mx: 2 }}>
          <Link to="" onClick={handleDrawerToggle}>
            <Box
              component="img"
              src={logoHeatPump}
              className="logo"
              alt="logo"
              sx={{
                mb: 3,
                mt: 5,
                width: "100%",
                maxWidth: "300px",
                minWidth: "150px",
              }}
            />
          </Link>
        </Box>
        <Button
          onClick={handleDrawerToggle}
          sx={{
            position: { xxs: "relative", sm: "absolute" },
            right: 8,
            mt: 2,
          }}
        >
          <CloseIcon
            sx={{
              fontSize: 32,
              color: "var(--color-text-5)",
            }}
          />
        </Button>
      </Stack>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
        spacing={2}
        height="100%"
      >
        <List variant="navLinks">
          {Object.keys(navbarItems).map((item) => (
            <div key={item}>
              {item !== "LearnMore" ? (
                <ListItem disablePadding onClick={handleDrawerToggle}>
                  <ListItemButton
                    sx={{ textAlign: "center" }}
                    component={Link}
                    to={navbarItems[item].link}
                    onClick={() => setOpenMoreMobile(false)} // Close the dropdown menu (if open) in the drawer when an item is selected
                  >
                    <ListItemText
                      sx={{
                        color: "var(--color-text-1)",
                      }}
                    >
                      <Typography
                        variant="navLinksMobile"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        {t(navbarItems[item].value).toUpperCase()}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ) : (
                <>
                  <ListItemButton
                    variant="navLinksMobile"
                    component={Link}
                    to=""
                    onClick={handleClickMoreMobile}
                  >
                    <ListItemText
                      sx={{
                        color: "var(--color-text-1)",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        endIcon={
                          openMoreMobile ? (
                            <ExpandLess
                              sx={{
                                color: "var(--color-text-1)",
                              }}
                            />
                          ) : (
                            <ExpandMore
                              sx={{
                                color: "var(--color-text-1)",
                              }}
                            />
                          )
                        }
                        sx={{ height: "20px" }}
                      >
                        <Typography
                          variant="navLinksMobile"
                          sx={{
                            color: "var(--color-text-1)",
                            fontWeight: "500",
                          }}
                        >
                          {t(navbarItems[item].value).toUpperCase()}
                        </Typography>
                      </Button>
                    </ListItemText>
                  </ListItemButton>
                  <Collapse in={openMoreMobile} timeout="auto" unmountOnExit>
                    {navbarItems[item] && navbarItems[item].items
                      ? Object.keys(navbarItems[item].items).map(
                          (subItemKey, index) => (
                            <List component="div" disablePadding key={index}>
                              <ListItem
                                disablePadding
                                onClick={handleDrawerToggle}
                              >
                                <ListItemButton
                                  id={index}
                                  variant="navLinks"
                                  sx={{ textAlign: "center" }}
                                  onClick={() => {
                                    handleNavigation(
                                      navbarItems[item].items[subItemKey].link
                                    );
                                    handleCloseMore();
                                    setOpenMoreMobile(false);
                                  }}
                                >
                                  <ListItemText
                                    sx={{
                                      color: "var(--color-text-1)",
                                    }}
                                  >
                                    <Typography
                                      variant="navLinksMobileDropdown"
                                      sx={{
                                        color: "var(--color-text-1)",
                                        fontWeight: "500",
                                      }}
                                    >
                                      {t(
                                        navbarItems[item].items[subItemKey]
                                          .value
                                      )}
                                    </Typography>
                                  </ListItemText>
                                </ListItemButton>
                              </ListItem>
                            </List>
                          )
                        )
                      : null}
                  </Collapse>
                </>
              )}
            </div>
          ))}
        </List>
        <Box>
          <Box onClick={handleDrawerToggle}>
            <ButtonGetPump />
          </Box>
          <Box sx={{ mt: 4 }}>
            <LangPrefDropdown />
          </Box>
        </Box>
      </Stack>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      id="navbar"
      sx={{
        display: "flex",
        zIndex: 3,
        // width: "100vw",
      }}
    >
      <AppBar
        position="static"
        mt={2}
        sx={{
          background: "var(--bgColor-2)",
          boxShadow: "none",
          padding: { xl: "0 18%" },
        }}
      >
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            wrap="nowrap"
          >
            <Grid item>
              <Link to="">
                <Box
                  component="img"
                  src={logoHeatPump}
                  className="logo"
                  alt="logo"
                  sx={{
                    my: 2,
                    width: "100%",
                    maxWidth: "300px",
                    minWidth: "192px",
                  }}
                />
              </Link>
            </Grid>
            <Grid item>
              <Box sx={{ display: { xs: "none", lg: "block" } }}>
                <Stack spacing={2} direction="row">
                  {Object.keys(navbarItems).map((item) => (
                    <div key={item}>
                      {item === "LearnMore" ? (
                        desktopNavLink(navbarItems, item)
                      ) : (
                        <Button component={Link} to={navbarItems[item].link}>
                          <Typography
                            variant="navLinks"
                            sx={{
                              color: "var(--color-text-1)",
                              fontWeight: "500",
                            }}
                          >
                            {t(navbarItems[item].value)}
                          </Typography>
                        </Button>
                      )}
                    </div>
                  ))}
                </Stack>
              </Box>
            </Grid>

            {/* Removed this button from the navbar */}
            {/* <Box
              sx={{
                position: "fixed",
                zIndex: 999999,
                top: "75%",
                backgroundColor: "black",
              }}
            >
              <LangPrefDropdown />
            </Box> */}

            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <LangPrefDropdown />
              <Grid item ml={2}>
                <ButtonGetPump variant="getpump" onClick={handleDrawerToggle} />
              </Grid>
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              size="large"
              sx={{
                ml: 2,
                display: { lg: "none" },
                color: "#ffffff",
                justifyContent: "flex-start",
              }}
            >
              <MenuIcon
                sx={{
                  fontSize: 32,
                  color: "var(--color-text-1)",
                }}
              />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          container={container}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="right"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "var(--bgColor-2)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;
