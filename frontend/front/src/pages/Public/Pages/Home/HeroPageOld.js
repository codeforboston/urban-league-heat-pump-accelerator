import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Typography, Box } from "@mui/material";
import ButtonGetPump from "../../Components/ButtonGetPump";

import { red, green, blue, yellow, orange } from "@mui/material/colors";

const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.up("xs")]: {
    backgroundColor: yellow[500],
  },
  [theme.breakpoints.up("sm")]: {
    backgroundColor: red[500],
  },
  [theme.breakpoints.up("md")]: {
    backgroundColor: blue[500],
  },
  [theme.breakpoints.up("lg")]: {
    backgroundColor: green[500],
  },
  [theme.breakpoints.up("xl")]: {
    backgroundColor: orange[500],
  },
}));

const HeroPageOld = ({ title, subtitle, text, image }) => {
  return (
    <Root>
      <Box
        display="flex"
        alignItems="center"
        backgroundColor="#98C7D6"
        overflow="hidden"
        sx={{ height: "calc(100vh - 115px)", maxHeight: "750px" }}
      >
        <Grid container spacing={3} justify="center">
          <Grid
            item
            xs={6}
            md={6}
            lg={6}
            xl={6}
            container
            alignItems="center"
            alignSelf="center"
          >
            <Box sx={{ flexGrow: 1 }} />
            <Box
              p={4}
              direction="column"
              justifyContent="center"
              alignItems="flex-end"
              sx={{
                position: "relative",
                maxWidth: "500px",
                minWidth: "300px",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1" mb={5}>
                {text}
              </Typography>
              <ButtonGetPump />
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            md={6}
            lg={6}
            xl={6}
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
                borderRadius: "10%",
                maxHeight: "700px",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Root>
  );
};

export default HeroPageOld;
