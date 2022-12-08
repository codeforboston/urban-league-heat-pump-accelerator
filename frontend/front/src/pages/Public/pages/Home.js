import React, { useEffect } from "react";
import { Typography, Box, Container, Grid, List, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import Goal from "../../../components/goal/Goal";


import { fetchHomeData } from "../../../features/home/homeSlice";
import HeroImage from "../../../assets/images/home-exterior.jpg";
import HeatPumpImage from "../../../assets/images/heat-pump-outside-home.jpg";
import SurveyorImage from "../../../assets/images/surveyor.jpg";
import IconList from "../../../components/iconList/IconList";

const Home = () => {
  const { title } = useSelector((state) => {
    console.log(state);
    return state.home;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  const greyBG = grey[200];

  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          width: "100%",
          height: "500px",
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0, 0, 0, 0.5)), url(${HeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          position: "relative",
          zIndex: "-1",
          flexGrow: 1
        }}
      >
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Grid item display="flex" flexDirection="column" alignItems="center">
            <Typography
              variant="h1"
              mb={3}
              textAlign="center"
              sx={{ color: "#FFF" }}
            >
              {title}
            </Typography>
            <Button variant="contained" sized="large">
              Learn more
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Container>
        {/* What are heating pumps */}
        <Grid container my={15}>
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h4">What are heating pumps?</Typography>
            <Typography variant="subtitle1">
              This paragraph will exp;ain what are heating pumps. This should be
              informational so that the customer has a good understanding of
              what it is and its purpose. This paragraph will exp;ain what are
              heating pumps. This should be informational so that the customer
              has a good understanding of what it is and its purpose.
            </Typography>
          </Grid>
        </Grid>

        {/* Why are heat pumps important */}
        <Grid container spacing={4} my={15}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{ width: "100%", height: "auto" }}
              src={HeatPumpImage}
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
          >
            <Typography variant="h4" textAlign="center">
              Why are heating pumps important?
            </Typography>
            <List dense={true}>
              <IconList
                heading="Stay cool"
                description="Can reverse to provide cooling in the summer - cheaper to run than traditional A/C"
              />
              <IconList
                heading="Save Money"
                description="Lower heating bills when compared to many other methods (max improvement vs oil or electric baseboards)"
              />
              <IconList
                heading="Survive climate-change"
                description="Reduces greenhouse gas emissions"
              />
            </List>
          </Grid>
        </Grid>

        {/* Energy Reduction Goals */}
        <Grid container my={15}>
          <Grid item xs={12} mb={2}>
            <Typography variant="h4" textAlign="center">
              Energy Reduction Goals
            </Typography>
          </Grid>
          <Goal percentage="78%" info="Example of real content" />
          <Goal percentage="36%" info="Great content is preferred" />
          <Goal percentage="62%" info="Need some content here" />
          <Goal percentage="95%" info="Example of real content" />
        </Grid>

        {/* What to Expect */}
        <Grid container spacing={4} my={15}>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography variant="h4" textAlign="center">
              What to Expect
            </Typography>
            <Typography variant="subtitle1" textAlign="center">
              Here are a few things that you can expect
            </Typography>
            <List dense={true}>
              <IconList
                heading="Step 1:"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              />

              <IconList
                heading="Step 2:"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              />

              <IconList
                heading="Step 3:"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              />
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{ width: "100%", height: "auto" }}
              src={SurveyorImage}
              alt="Heat pump"
            />
          </Grid>
        </Grid>

        {/* CTA */}
        <Grid container my={5} py={6} px={3} bgcolor={greyBG}>
          <Grid item xs={12} md={9} display="flex" flexDirection="column">
            <Typography variant="h4" mb={2}>
              Are you ready to take advantage of this benefit?
            </Typography>
          </Grid>
          <Grid item xs={12} md={3} display="flex" justifyContent="center">
            <Button variant="contained" mt={2}>
              Learn more
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* <Footer /> */}
    </>
  );
};

export default Home;
