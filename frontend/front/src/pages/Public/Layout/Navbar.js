import * as React from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import strings from "../Assets/constants";
import { Link } from "react-router-dom";
import ButtonGetPump from "../Components/ButtonGetPump";

const drawerWidth = "100%";
const navItems = ["Home", "About", "Survey", "Contact"];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
      <ButtonGetPump />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" marginTop={2} sx={{ bgcolor: "#fff" }}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Box sx={{ my: 2, flexGrow: 1 }}>
            <Typography variant="h6" sx={{ my: 2, flexGrow: 1, color: "#000" }}>
              {strings.appName}
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Stack spacing={2} direction="row">
              {navItems.map((item) => (
                <Button
                  key={item}
                  component={Link}
                  to={item.toLowerCase() === "home" ? "" : item.toLowerCase()}
                  sx={{ color: "navbar.button.main" }}
                >
                  {item}
                </Button>
              ))}
              <ButtonGetPump />
            </Stack>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              ml: 2,
              display: { sm: "none" },
              color: "#000",
              justifyContent: "flex-start",
            }}
          >
            <MenuIcon />
          </IconButton>
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              color: "#000",
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
