import React from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Box,
  Grid,
  Button,
  Container,
  CardContent,
  CardActions,
} from "@mui/material";
import ButtonGetPumnp from "../Components/ButtonGetPump";
import surveyorImage from "../../../assets/images/surveyor.jpg";
import imageTwo from "../../../assets/images/heat-pump-outside-home.jpg";
import imageThree from "../../../assets/images/home-exterior.jpg";
import imageHero from "../../../assets/images/ulemhouse.png";

const Home = () => {
  return (
    <Box>
      {/* Hero */}
      <Grid
        container
        spacing={4}
        mb={15}
        mt={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="end"
          align="center"
        >
          <Typography width="350px" variant="h4" color="initial">
            Boston Residents Can Benefit From Heat Pumps
          </Typography>
          <CardContent>
            <Typography width="350px" color="initial" variant="subtitle1">
              Heat pumps are effective, continuous, nearly silent and extremely
              energy efficient.
            </Typography>

            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <ButtonGetPumnp />
            </CardActions>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={imageHero}
            alt="Heat pump"
            sx={{ borderRadius: "15%", width: "auto" }}
          />
        </Grid>
      </Grid>

      <Container>
        {/* 1. Section image right + button */}
        <Grid container spacing={4} my={15}>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
          >
            <Typography variant="h5" textAlign="center">
              Save Money
            </Typography>
            <CardContent>
              <Typography gutterBottom variant="body1" color="text.secondary">
                Heat pumps can reduce electricity usage for heating by up to 50%
                compared to electrical furnaces and baseboard heaters
              </Typography>
              <Typography gutterBottom variant="body1" color="text.secondary">
                Compare your current heating/cooling system and see how much
                money you could save.
              </Typography>

              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button>SAVINGS CALCULATOR</Button>
              </CardActions>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{ width: "100%", height: "auto" }}
              src={imageTwo}
              alt="Heat pump"
            />
          </Grid>
        </Grid>

        {/* 2. Section image left */}
        <Grid container spacing={4} my={15}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{ width: "100%", height: "auto" }}
              src={imageThree}
              alt="Heat pump"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
          >
            <Typography variant="h5" textAlign="center">
              Improve Heating and Cooling
            </Typography>
            <CardContent>
              <Typography gutterBottom variant="body1" color="text.secondary">
                Heat pumps are effective, continuous, nearly silent and
                extremely energy efficient.
              </Typography>
              <Typography gutterBottom variant="body1" color="text.secondary">
                Rather than provide blasts of hot or cold air, heat pumps
                provide continuous, low-level operation.
              </Typography>
            </CardContent>
          </Grid>
        </Grid>

        {/* 3. Section image right - button  */}
        <Grid container spacing={4} my={15}>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
          >
            <Typography variant="h5" textAlign="center">
              Strengthen Community
            </Typography>
            <CardContent>
              <Typography gutterBottom variant="body1" color="text.secondary">
                Switching to an Air Source Heat Pump can help long-time Boston
                residents stay in their homes.
              </Typography>
              <Typography gutterBottom variant="body1" color="text.secondary">
                Air Source Heat Pumps can lower utility costs and add important
                active cooling capacity in many homes that previously had none.
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{ width: "100%", height: "auto" }}
              src={surveyorImage}
              alt="Heat pump"
            />
          </Grid>
        </Grid>

        {/* 4. Section image left + button */}
        <Grid container spacing={4} my={15}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{ width: "100%", height: "auto" }}
              src={imageTwo}
              alt="Heat pump"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
          >
            <Typography variant="h5" textAlign="center">
              Reduce Carbon Emissions
            </Typography>
            <CardContent>
              <Typography gutterBottom variant="body1" color="text.secondary">
                Heat pumps are highly efficient heating and cooling systems.
                They become greener/cleaner as their electric power source
                shifts to lower/no-carbon generation.
              </Typography>
              <Typography gutterBottom variant="body1" color="text.secondary">
                Learn more about how Air Source Heat Pumps can reduce carbon
                footprint.
              </Typography>

              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button>CLEAN ENERGY GUIDE</Button>
              </CardActions>
            </CardContent>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
