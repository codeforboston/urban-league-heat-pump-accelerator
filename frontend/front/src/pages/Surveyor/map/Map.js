import { Box, Button, Container, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import MapLink from "./MapLink";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const noData = (returnDashboard) => (
  <Box
    display={"flex"}
    justifyContent="center"
    flexDirection={"column"}
    alignContent="center"
    textAlign={"center"}
    mt={10}
  >
    <Typography>MapView</Typography>

    <Typography>No home data to display</Typography>
    <Box mt={2}>
      <Button variant="contained" onClick={returnDashboard}>
        RETURN TO DASHBOARD
      </Button>
    </Box>
  </Box>
);
const MapRender = (homeData) => (
  <Box
    display={"flex"}
    justifyContent="center"
    flexDirection={"column"}
    alignContent="center"
    textAlign={"center"}
    m={4}
  >
    <Typography variant="h5">GOOGLE MAP LINK</Typography>
    <MapLink homeData={homeData} />
  </Box>
);

const Map = () => {
  const homeData = useSelector((state) => state.surveyor.selectedHome);
  const navigate = useNavigate();
  console.log(homeData);

  const [display, setDisplay] = useState(null);

  const returnDashboard = useCallback(() => {
    navigate("/surveyor/dashboard");
  }, [navigate]);

  useEffect(() => {
    if (homeData.length === 0) {
      console.log("no data send back to dashboard");
      setDisplay(() => noData(returnDashboard));
    } else {
      setDisplay(() => MapRender(homeData));
    }
  }, [homeData, returnDashboard]);

  return <Container>{display}</Container>;
};

export default Map;
