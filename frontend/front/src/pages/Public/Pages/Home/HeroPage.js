import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Typography, Box } from "@mui/material";
import { red, green, blue } from "@mui/material/colors";

const Root = styled("div")(({ theme }) => ({
  // padding: theme.spacing(1),
  // [theme.breakpoints.down("md")]: {
  //   backgroundColor: red[500],
  // },
  // [theme.breakpoints.up("md")]: {
  //   backgroundColor: blue[500],
  // },
  // [theme.breakpoints.up("lg")]: {
  //   backgroundColor: green[500],
  // },
}));

const HeroPage = ({ title, text, image }) => {
  return (
    <Root>
      <Box
        display="flex"
        alignItems="center"
        backgroundColor="#98C7D6"
        overflow="hidden"
        sx={{ height: "calc(100vh - 115px)" }}
      >
        <Grid container spacing={3} sx={{ height: "calc(100vh - 115px)" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",

              flexDirection: "column",
            }}
          >
            <Box p={5}>
              <Typography variant="h4">{title}</Typography>
              <Typography variant="body1">{text}</Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            md={6}
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Box
              component="img"
              src={image}
              alt={title}
              sx={{
                display: "flex",
                justifyContent: "end",
                flexDirection: "row",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Root>
  );
};

export default HeroPage;
