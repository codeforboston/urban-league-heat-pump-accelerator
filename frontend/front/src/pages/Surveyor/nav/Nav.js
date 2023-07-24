import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import {
  ROLE_ADMIN,
  useUserHasRoles,
} from "../../../features/login/loginUtils";

import LeftDrawer from "./LeftDrawer";
import { Link } from "react-router-dom";
import React from "react";
import { selectCurrentUserEmail } from "../../../features/login/loginSlice";
import { useLogoutUserMutation } from "../../../api/apiSlice";
import { useSelector } from "react-redux";

const Nav = () => {
  const [logout] = useLogoutUserMutation();
  const userIsAdmin = useUserHasRoles(ROLE_ADMIN);
  const currentUserEmail = useSelector(selectCurrentUserEmail);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box ml="auto" sx={{ display: { xs: "block", sm: "none" } }}>
            <LeftDrawer />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <Button color="inherit" component={Link} to="dashboard">
              <Typography variant="h6" component="div">
                DASHBOARD
              </Typography>
            </Button>

            {userIsAdmin && (
              <Button color="inherit" component={Link} to="/admin">
                <Typography variant="h7" component="div">
                  ADMIN MODE
                </Typography>
              </Button>
            )}
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button color="inherit" component={Link} to="account">
              <Typography variant="h6">{currentUserEmail}</Typography>
            </Button>
          </Box>
          {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button color="inherit" component={Link} to="house">
              <Typography variant="h6">HOUSE PROFILE</Typography>
            </Button>
          </Box> */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button color="inherit" onClick={logout}>
              <Typography variant="h6">LOG OUT</Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
