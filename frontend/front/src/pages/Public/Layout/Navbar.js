import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ButtonGetPump from "../Components/ButtonGetPump";
import logoHeatPump from "../../../assets/images/boston-heat-pump-logo.gif";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// import { red, green, blue, yellow, orange } from "@mui/material/colors";
const Root = styled("div")(({ theme }) => ({
  // padding: theme.spacing(1),
  // [theme.breakpoints.up("xs")]: {
  //   backgroundColor: yellow[500],
  // },
  // [theme.breakpoints.up("sm")]: {
  //   backgroundColor: red[500],
  // },
  // [theme.breakpoints.up("md")]: {
  //   backgroundColor: blue[500],
  // },
  // [theme.breakpoints.up("lg")]: {
  //   backgroundColor: green[500],
  // },
  // [theme.breakpoints.up("xl")]: {
  //   backgroundColor: orange[500],
  // },
}));

const drawerWidth = "100%";

const navbarItems = {
  SURVEY: { link: "survey" },
  "Learn More": {
    "About BHPA": { link: "about-us" },
    "About Heat Pump": { link: "about-heat-pump" },
    "Benefits of Heat Pumps": { link: "benefits-heat-pump" },
    Testimonials: { link: "testimonial-section" },
  },
  "GET INVOLVED": { link: "get-involved" },
};

function Navbar(props) {
  const [anchorMore, setAnchorMore] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMoreMobile, setOpenMoreMobile] = useState(false);

  const { window } = props;

  const navigate = useNavigate();

  const open = Boolean(anchorMore);

  const handleClickMore = (event) => setAnchorMore(event.currentTarget);
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
    } else if (link === "benefits-heat-pump") {
      navigate("/public#benefits-heat-pump");
      setTimeout(() => {
        const target = document.getElementById("benefits-heat-pump");
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
        onMouseEnter={handleClickMore}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ color: "var(--color-text-1)" }}
      >
        <Typography variant="navLinks">{item}</Typography>
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
        <Box
          onMouseEnter={() => {
            handleClickMore();
          }}
          onMouseLeave={() => {
            handleCloseMore();
          }}
        >
          {Object.keys(navbarItems[item]).map((subItem, index) => (
            <MenuItem
              variant="navLinks"
              onClick={() => {
                handleNavigation(navbarItems[item][subItem].link);
                handleCloseMore();
              }}
            >
              {subItem}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Box sx={{ flexGrow: 1 }}>
          <Link to="" onClick={handleDrawerToggle}>
            <Box
              component="img"
              src={logoHeatPump}
              className="logo"
              alt="logo"
              sx={{
                mb: 3,
                mt: 5,
                maxWidth: "100%",
                "@media (max-width: 385px)": {
                  minWidth: "192px",
                },
              }}
            />
          </Link>
        </Box>
        <Button
          onClick={handleDrawerToggle}
          sx={{ position: "absolute", right: 0, mt: 2 }}
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
        justifyContent="space-around"
        alignItems="stretch"
        spacing={2}
        height="100%"
      >
        <List variant="navLinks">
          {Object.keys(navbarItems).map((item) => (
            <>
              {item !== "Learn More" ? (
                <ListItem
                  key={item}
                  disablePadding
                  onClick={handleDrawerToggle}
                >
                  <ListItemButton
                    sx={{ textAlign: "center" }}
                    component={Link}
                    to={navbarItems[item].link}
                    focusVisible
                    onClick={() => setOpenMoreMobile(false)} // Close the dropdown menu (if open) in the drawer when an item is selected
                  >
                    <ListItemText
                      sx={{
                        color: "var(--color-text-1)",
                      }}
                    >
                      <Typography
                        variant="navLinks"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        {item}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ) : (
                <>
                  <ListItemButton
                    variant="navLinks"
                    component={Link}
                    to=""
                    focusVisible
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
                        disablePadding
                        sx={{ height: "20px" }}
                      >
                        <Typography
                          variant="navLinks"
                          sx={{
                            color: "var(--color-text-1)",
                            fontWeight: "500",
                          }}
                        >
                          {item}
                        </Typography>
                      </Button>
                    </ListItemText>
                  </ListItemButton>
                  <Collapse in={openMoreMobile} timeout="auto" unmountOnExit>
                    {Object.keys(navbarItems[item]).map((subItem, index) => (
                      <List component="div" disablePadding>
                        <ListItem
                          key={subItem}
                          disablePadding
                          onClick={handleDrawerToggle}
                        >
                          <ListItemButton
                            variant="navLinks"
                            sx={{ textAlign: "center" }}
                            onClick={() => {
                              handleNavigation(navbarItems[item][subItem].link);
                              handleCloseMore();
                              setOpenMoreMobile(false); // Close the dropdown menu (if open) in the drawer when an item is selected
                            }}
                            focusVisible
                          >
                            <ListItemText
                              sx={{
                                color: "var(--color-text-1)",
                              }}
                            >
                              <Typography
                                variant="navLinks"
                                sx={{
                                  color: "var(--color-text-1)",
                                  fontWeight: "500",
                                }}
                              >
                                {subItem}
                              </Typography>
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </List>
                    ))}
                  </Collapse>
                </>
              )}
            </>
          ))}
        </List>
        <Box onClick={handleDrawerToggle}>
          <ButtonGetPump variant="getpump" />
        </Box>
      </Stack>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
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
          marginTop={2}
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
              wrap="noWrap"
            >
              <Grid item sx={{ my: 2 }}>
                <Link to="">
                  <Box
                    component="img"
                    src={logoHeatPump}
                    className="logo"
                    alt="logo"
                    sx={{
                      my: 2,
                      maxWidth: "100%",
                      "@media (max-width: 385px)": {
                        minWidth: "192px",
                      },
                    }}
                  />
                </Link>
              </Grid>
              <Grid item>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Stack spacing={2} direction="row">
                    {Object.keys(navbarItems).map((item) => (
                      <>
                        {item === "Learn More" ? (
                          desktopNavLink(navbarItems, item)
                        ) : (
                          <Button
                            key={item}
                            component={Link}
                            to={navbarItems[item].link}
                          >
                            <Typography
                              variant="navLinks"
                              sx={{
                                color: "var(--color-text-1)",
                                fontWeight: "500",
                              }}
                            >
                              {item}
                            </Typography>
                          </Button>
                        )}
                      </>
                    ))}
                  </Stack>
                </Box>
              </Grid>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Grid item>
                  <ButtonGetPump
                    variant="getpump"
                    onClick={handleDrawerToggle}
                  />
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
                  display: { md: "none" },
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
            variant="navLinks"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            anchor="right"
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                color: "var(--color-text-2)",
                background: "var(--bgColor-2)",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </Root>
  );
}

export default Navbar;
