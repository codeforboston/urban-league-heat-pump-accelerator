import React from "react";
import { Typography, Stack, Box, Button, Grid, Divider } from "@mui/material";
import strings from "../Assets/constants";
import ButtonGetPump from "../Components/ButtonGetPump";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      pt={4}
      sx={{
        bgcolor: "footer.bgColor",
        color: "#FFF",
      }}
    >
      <Grid container spacing={4} sx={{ alignItems: "center" }}>
        <Grid item lg={12} mt={4} alignItems="center">
          <Stack
            direction="row"
            spacing={6}
            justifyContent="center"
            alignItems="center"
            divider={
              <Divider
                orientation="vertical"
                flexItem
                variant="fullWidth"
                color="gray"
              />
            }
            // sx={{
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "center",
            // }}
          >
            <Button
              component={Link}
              to="survey"
              sx={{ color: "#fff", width: "200px" }}
              size="medium"
            >
              Take The Survey
            </Button>
            <ButtonGetPump variant="getpumpOutlined" />
            <Button
              component={Link}
              to="about"
              sx={{ color: "#fff", width: "200px" }}
              size="medium"
            >
              Learn More About Us
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack justifyContent="center" p={4} sx={{ color: "main" }}>
            <Typography align="center">
              © {currentYear} Copyrights: {strings.appName}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
