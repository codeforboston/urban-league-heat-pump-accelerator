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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import ButtonGetPump from "../Components/ButtonGetPump";
// import logoHeatPump from "../../../assets/images/logoHeatPump.png";
import logoHeatPump from "../../../assets/images/boston-heat-pump-logo.gif";
import heatPumpFan from "../../../assets/images/fan-heat-pumpSM.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const drawerWidth = "100%";

const ImageAnimation = styled("div")(({ theme }) => ({
  "& .home-hero-fan": {
    left: "66px",
    top: "72px",
    width: "58px",
    position: "absolute",
    transform: "translate(-50%,-50%)",
    animation: "fanHero 1.5s infinite linear",
    display: "none",
  },
  [theme.breakpoints.up("xs")]: {
    "& .home-hero-fan": {
      marginLeft: "-1.5%",
    },
  },
  [theme.breakpoints.up("sm")]: {
    "& .home-hero-fan": {
      marginLeft: "0%",
    },
  },
}));

function Navbar(props) {
  const [anchorLearn, setAnchorLearn] = useState(null);
  const [anchorMore, setAnchorMore] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLearnMobile, setOpenLearnMobile] = useState(false);
  const [openMoreMobile, setOpenMoreMobile] = useState(false);

  const { window } = props;

  const openLearn = Boolean(anchorLearn);
  const openMore = Boolean(anchorMore);

  const handleClickLearn = (event) => setAnchorLearn(event.currentTarget);
  const handleCloseLearn = () => setAnchorLearn(null);
  const handleClickMore = (event) => setAnchorMore(event.currentTarget);
  const handleCloseMore = () => setAnchorMore(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleClickLearnMobile = () => setOpenLearnMobile(!openLearnMobile);
  const handleClickMoreMobile = () => setOpenMoreMobile(!openMoreMobile);

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
      <List>
        <ListItem key="home" disablePadding onClick={handleDrawerToggle}>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component={Link}
            to=""
            focusVisible
          >
            <ListItemText
              sx={{
                color: "var(--color-text-2)",
              }}
              primary="HOME"
            />
          </ListItemButton>
        </ListItem>

        <ListItemButton
          component={Link}
          to=""
          focusVisible
          onClick={handleClickLearnMobile}
        >
          <ListItemText
            sx={{
              color: "var(--color-text-2)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              endIcon={openLearnMobile ? <ExpandLess /> : <ExpandMore />}
              disablePadding
              variant="text"
              sx={{ height: "20px" }}
            >
              <Typography variant="navLinks">LEARN MORE</Typography>
            </Button>
          </ListItemText>
        </ListItemButton>
        <Collapse in={openLearnMobile} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{ background: "var(--bgColor-2)" }}
          >
            <ListItem key="home" disablePadding onClick={handleDrawerToggle}>
              <ListItemButton
                sx={{ textAlign: "center" }}
                component={Link}
                to="about"
                focusVisible
              >
                <ListItemText
                  sx={{
                    color: "var(--color-text-2)",
                  }}
                  primary="ABOUT US"
                />
              </ListItemButton>
            </ListItem>
            <ListItem key="home" disablePadding onClick={handleDrawerToggle}>
              <ListItemButton
                sx={{ textAlign: "center" }}
                component={Link}
                to="contact"
                focusVisible
              >
                <ListItemText
                  sx={{
                    color: "var(--color-text-2)",
                  }}
                  primary="CONTACT US"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
        <ListItem disablePadding onClick={handleDrawerToggle}>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component={Link}
            to="survey"
            focusVisible
          >
            <ListItemText
              sx={{
                color: "var(--color-text-2)",
                fontWeight: "400",
              }}
              primary="SURVEY"
            />
          </ListItemButton>
        </ListItem>

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
              onClick={handleClickMoreMobile}
              endIcon={openMoreMobile ? <ExpandLess /> : <ExpandMore />}
              disablePadding
              variant="text"
              sx={{ height: "20px" }}
            >
              <Typography variant="navLinks">MORE</Typography>
            </Button>
          </ListItemText>
        </ListItemButton>
        <Collapse in={openMoreMobile} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{ background: "var(--bgColor-2)" }}
          >
            <ListItem disablePadding onClick={handleDrawerToggle}>
              <ListItemButton
                sx={{ textAlign: "center" }}
                component={Link}
                to="spreadtheworld"
                focusVisible
              >
                <ListItemText
                  sx={{
                    color: "var(--color-text-2)",
                  }}
                  primary="SPREAD THE WORLD"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleDrawerToggle}>
              <ListItemButton
                sx={{ textAlign: "center" }}
                component={Link}
                to="faq"
                focusVisible
              >
                <ListItemText
                  sx={{
                    color: "var(--color-text-2)",
                  }}
                  primary="FAQ"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleDrawerToggle}>
              <ListItemButton
                sx={{ textAlign: "center" }}
                component={Link}
                to="/surveyor"
                focusVisible
              >
                <ListItemText
                  sx={{
                    color: "var(--color-text-2)",
                  }}
                  primary="LOG IN"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </List>
      <ButtonGetPump variant="getpumpMobile" />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
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
                  <Button component={Link} to="">
                    <Typography variant="navLinks">HOME</Typography>
                  </Button>
                  <div>
                    <Button
                      id="basic-button"
                      aria-controls={openLearn ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openLearn ? "true" : undefined}
                      onClick={handleClickLearn}
                      endIcon={<KeyboardArrowDownIcon />}
                      size="medium"
                    >
                      <Typography variant="navLinks">Learn More</Typography>
                    </Button>
                    <Menu
                      id="nav-link-dropdown"
                      anchorEl={anchorLearn}
                      open={openLearn}
                      onClose={handleCloseLearn}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={handleCloseLearn}
                        component={Link}
                        to="about"
                      >
                        ABOUT US
                      </MenuItem>
                      <MenuItem
                        onClick={handleCloseLearn}
                        component={Link}
                        to="contact"
                      >
                        CONTACT US
                      </MenuItem>
                    </Menu>
                  </div>
                  <Button component={Link} to="survey">
                    <Typography variant="navLinks">SURVEY</Typography>
                  </Button>
                  <div>
                    <Button
                      id="basic-button"
                      aria-controls={openMore ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMore ? "true" : undefined}
                      onClick={handleClickMore}
                      endIcon={<KeyboardArrowDownIcon />}
                      size="medium"
                    >
                      <Typography variant="navLinks">MORE</Typography>
                    </Button>
                    <Menu
                      id="nav-link-dropdown"
                      anchorEl={anchorMore}
                      open={openMore}
                      onClose={handleCloseMore}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={handleCloseMore}
                        component={Link}
                        to="spreadtheworld"
                      >
                        SPREAD THE WORLD
                      </MenuItem>
                      <MenuItem
                        onClick={handleCloseMore}
                        component={Link}
                        to="faq"
                      >
                        FAQ
                      </MenuItem>
                      <MenuItem
                        onClick={handleCloseMore}
                        component={Link}
                        to="/surveyor"
                      >
                        LOG IN
                      </MenuItem>
                    </Menu>
                  </div>
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
  );
}

export default Navbar;
