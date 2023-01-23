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
import CloseIcon from "@mui/icons-material/Close";
import strings from "../Assets/constants";
import { Link } from "react-router-dom";
import ButtonGetPump from "../Components/ButtonGetPump";
import logoHeatPump from "../../../assets/images/logoHeatPump.svg";

/**
 * TODO:
 * - []Correct the size of the logoHeatPump logo
 */
const drawerWidth = "100%";
const navItems = ["HOME", "ABOUT", "SURVEY", "CONTACT"];

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
              <ListItemText primary={item} />
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
          bgcolor: "#98C7D6",
          background:
            "linear-gradient(90deg, rgba(152,199,214,1) 50%, rgba(114,190,222,1) 100%)",
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
              <Box
                // FIXME: Fixed the logo with the right messures
                component="img"
                src={logoHeatPump}
                alt="logo"
                sx={{
                  height: "60px",
                  my: 2,
                }}
              />
            </Grid>
            <Grid item>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Stack spacing={2} direction="row">
                  {navItems.map((item) => (
                    <Button
                      variant="navbar"
                      key={item}
                      component={Link}
                      to={
                        item.toLowerCase() === "home" ? "" : item.toLowerCase()
                      }
                    >
                      {item}
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
              color: "textColors.second",
              bgcolor: "#98C7D6",
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
