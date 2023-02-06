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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import strings from "../Assets/constants";
import { Link } from "react-router-dom";
import ButtonGetPump from "../Components/ButtonGetPump";
import logoHeatPump from "../../../assets/images/logoHeatPump.png";
import heatPumpFan from "../../../assets/images/fan-heat-pumpSM.png";

const drawerWidth = "100%";
const navItems = ["HOME", "ABOUT", "SURVEY", "CONTACT"];

const ImageAnimation = styled("div")(({ theme }) => ({
  "& .home-hero-fan": {
    left: "55px",
    top: "62px",
    position: "absolute",
    transform: "translate(-50%,-50%)",
    animation: "fanHero 1.5s infinite linear",
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
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }} onClick={handleDrawerToggle}>
      <Stack direction="row" alignItems="center">
        <Button ml={2}>
          <CloseIcon />
        </Button>

        <Box sx={{ my: 2, flexGrow: 1, marginRight: "48px" }}>
          <Typography variant="h6" sx={{ my: 2, flexGrow: 1 }}>
            {strings.appName}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to={item.toLowerCase() === "home" ? "" : item.toLowerCase()}
              focusVisible
            >
              <ListItemText
                sx={{
                  // textShadow: "1px 1px 2px #000",
                  color: "var(--color-text-2)",
                }}
                primary={item}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <ButtonGetPump variant="getpump" />
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
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Stack spacing={2} direction="row">
                  {navItems.map((item) => (
                    <Button
                      key={item}
                      component={Link}
                      to={
                        item.toLowerCase() === "home" ? "" : item.toLowerCase()
                      }
                    >
                      <Typography variant="navLinks">{item}</Typography>
                    </Button>
                  ))}
                </Stack>
              </Box>
            </Grid>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
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
