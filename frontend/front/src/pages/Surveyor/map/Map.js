import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MapLink from "./MapLink";

const Map = () => {
  const homeData = useSelector((state) => state.surveyor.selectedHome);
  const navigate = useNavigate();
  console.log(homeData);

  const [display, setDisplay] = useState(null);
  const returnDashboard = () => {
    navigate("/surveyor/dashboard");
  };

  const noData = (
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

  const MapRender = () => (
    <Box
      display={"flex"}
      justifyContent="center"
      flexDirection={"column"}
      alignContent="center"
      textAlign={"center"}
      mt={10}
    >
      <Typography>MAP LINKS</Typography>
      <MapLink cluster={homeData} />
    </Box>
  );

  useEffect(() => {
    if (homeData.length === 0) {
      console.log("no data send back to dashboard");
      setDisplay(noData);
    } else {
      setDisplay(MapRender());
    }
  }, [homeData]);
  return <Container>{display}</Container>;
};

export default Map;
