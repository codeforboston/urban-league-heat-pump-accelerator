import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Divider,
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
import { Link } from "react-router-dom";
import ButtonGetPump from "../Components/ButtonGetPump";
import logoHeatPump from "../../../assets/images/boston-heat-pump-logo.gif";
import heatPumpFan from "../../../assets/images/fan-heat-pumpSM.png";
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
  HOME: { link: "" },
  "LEARN MORE": { link: "learn-more" },
  "ABOUT US": { link: "about" },
  SURVEY: { link: "survey" },
  MORE: {
    "SPREAD THE WORLD": { link: "spreadtheworld" },
    TESTIMONIALS: { link: "testimonials" },
    FAQ: { link: "faq" },
    LOGIN: { link: "/surveyor" },
  },
};

const ImageAnimation = styled("div")(({ theme }) => ({
  "& .home-hero-fan": {
    left: "55px",
    top: "62px",
    position: "absolute",
    transform: "translate(-50%,-50%)",
    animation: "fanHero 1.5s infinite linear",
    display: "none",
  },
  [theme.breakpoints.up("xs")]: {
    "& .home-hero-fan": {
      marginLeft: "-1%",
    },
  },
  [theme.breakpoints.up("sm")]: {
    "& .home-hero-fan": {
      marginLeft: "0%",
    },
  },
}));

function Navbar(props) {
  const [anchorMore, setAnchorMore] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMoreMobile, setOpenMoreMobile] = useState(false);

  const { window } = props;

  const open = Boolean(anchorMore);

  const handleClickMore = (event) => setAnchorMore(event.currentTarget);
  const handleCloseMore = () => setAnchorMore(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleClickMoreMobile = () => setOpenMoreMobile(!openMoreMobile);

  const desktopNavLink = (navbarItems, item) => (
    <>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickMore}
        endIcon={<KeyboardArrowDownIcon />}
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
        {Object.keys(navbarItems[item]).map((subItem, index) => (
          <MenuItem
            onClick={handleCloseMore}
            component={Link}
            to={navbarItems[item][subItem].link}
          >
            {subItem}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Stack direction="row" alignItems="center">
        <Button onClick={handleDrawerToggle}>
          <CloseIcon />
        </Button>

        <Box sx={{ flexGrow: 1, marginRight: "48px" }}>
          <Box
            component="img"
            src={logoHeatPump}
            className="logo"
            alt="logo"
            sx={{
              my: 2,
            }}
          />
        </Box>
      </Stack>
      <Divider />
      <List variant="caption">
        {Object.keys(navbarItems).map((item) => (
          <>
            {item !== "MORE" ? (
              <ListItem key={item} disablePadding onClick={handleDrawerToggle}>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  component={Link}
                  to={navbarItems[item].link}
                  focusVisible
                >
                  <ListItemText
                    primary={item}
                    sx={{
                      color: "var(--color-text-2)",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              <>
                <ListItemButton
                  component={Link}
                  to=""
                  focusVisible
                  onClick={handleClickMoreMobile}
                >
                  <ListItemText
                    sx={{
                      color: "var(--color-text-2)",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      endIcon={openMoreMobile ? <ExpandLess /> : <ExpandMore />}
                      disablePadding
                      variant="text"
                      sx={{ height: "20px" }}
                    >
                      <Typography variant="navLinks">{item}</Typography>
                    </Button>
                  </ListItemText>
                </ListItemButton>
                <Collapse in={openMoreMobile} timeout="auto" unmountOnExit>
                  {Object.keys(navbarItems[item]).map((subItem, index) => (
                    <List
                      component="div"
                      disablePadding
                      sx={{ background: "var(--bgColor-2)" }}
                    >
                      <ListItem
                        key={subItem}
                        disablePadding
                        onClick={handleDrawerToggle}
                      >
                        <ListItemButton
                          sx={{ textAlign: "center" }}
                          component={Link}
                          to={navbarItems[item][subItem].link}
                          focusVisible
                        >
                          <ListItemText
                            sx={{
                              color: "var(--color-text-2)",
                            }}
                            primary={subItem}
                          />
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
      <ButtonGetPump variant="getpump" />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <Box sx={{ display: "flex", zIndex: 3 }}>
        <AppBar
          position="static"
          marginTop={2}
          sx={{
            bgcolor: "var(--bgColor-1)",
            background: "var(--bgColor-1)",
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
            >
              <Grid item sx={{ my: 2 }}>
                <ImageAnimation>
                  <Box
                    component="img"
                    src={logoHeatPump}
                    className="logo"
                    alt="logo"
                    sx={{
                      my: 2,
                    }}
                  />
                  <Box
                    component="img"
                    src={heatPumpFan}
                    alt="heat-pump-fan"
                    className="home-hero-fan"
                  ></Box>
                </ImageAnimation>
              </Grid>
              <Grid item>
                <Box sx={{ display: { xs: "none", lg: "block" } }}>
                  <Stack spacing={2} direction="row">
                    {Object.keys(navbarItems).map((item) => (
                      <>
                        {item === "MORE" ? (
                          desktopNavLink(navbarItems, item)
                        ) : (
                          <Button
                            key={item}
                            component={Link}
                            to={navbarItems[item].link}
                          >
                            <Typography variant="navLinks">{item}</Typography>
                          </Button>
                        )}
                      </>
                    ))}
                  </Stack>
                </Box>
              </Grid>
              <Box sx={{ display: { xs: "none", lg: "block" } }}>
                <Grid item>
                  <ButtonGetPump variant="getpumpOutlined" />
                </Grid>
              </Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  ml: 2,
                  display: { lg: "none" },
                  color: "#000",
                  justifyContent: "flex-start",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>

        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
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
                color: "var(--color-text-1)",
                background: "var(--bgColor-1)",
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
