import { useState } from "react";
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
import { Link } from "react-router-dom";
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
  "GET INVOLVED": { link: "get-involved" },
  SURVEY: { link: "survey" },
  "LEARN MORE": {
    "ABOUT US": { link: "about-us" },
    "ABOUT HEAT PUMP": { link: "about-heat-pump" },
    TESTIMONIALS: { link: "testimonials" },
    FAQ: { link: "faq" },
  },
};

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
      </Stack>

      <List variant="caption">
        {Object.keys(navbarItems).map((item) => (
          <>
            {item !== "LEARN MORE" ? (
              <ListItem key={item} disablePadding onClick={handleDrawerToggle}>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  component={Link}
                  to={navbarItems[item].link}
                  focusVisible
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
                      endIcon={openMoreMobile ? <ExpandLess /> : <ExpandMore />}
                      disablePadding
                      variant="text"
                      sx={{ height: "20px" }}
                    >
                      <Typography
                        variant="navLinks"
                        sx={{ color: "var(--color-text-1)" }}
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
                          sx={{ textAlign: "center" }}
                          component={Link}
                          to={navbarItems[item][subItem].link}
                          focusVisible
                        >
                          <ListItemText
                            sx={{
                              color: "var(--color-text-1)",
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
      <Box
        id="navbar"
        sx={{
          display: "flex",
          zIndex: 3,
          width: "100vw",
        }}
      >
        <AppBar
          position="static"
          marginTop={2}
          sx={{
            background: "var(--bgColor-13)",
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
                        {item === "LEARN MORE" ? (
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
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Grid item>
                  <ButtonGetPump variant="getpump" />
                </Grid>
              </Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  ml: 2,
                  display: { md: "none" },
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
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                color: "var(--color-text-2)",
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
