import { Box, Container, Typography } from "@mui/material";

import GoogleMap from "./GoogleMap";
import MapLink from "./MapLink";
import React from "react";

const cluster1 = [];

const locations = [
  { lat: 37.7749, lng: -122.4194 }, // San Francisco
  { lat: 37.3382, lng: -121.8863 }, // San Jose
  { lat: 37.7749, lng: -122.4194 }, // San Francisco
];

const Map = () => {
  const bostonlocation = [];

  const calclocation = () => {
    // limit placed by google maps api < 25 stops possible
    for (let i = 0; i < 24; i++) {
      const lat = parseFloat(cluster1[i].latitude);
      const lng = parseFloat(cluster1[i].longitude);
      bostonlocation.push({ lat: lat, lng: lng });
    }
  };

  calclocation();
  console.log(bostonlocation);
  console.log(locations);

  // DRIVING
  return (
    <Container>
      <Box m={5}>
        <Box>
          <Typography>Google Map</Typography>
        </Box>
        {<GoogleMap locations={bostonlocation} travelMode="WALKING" />}

        <MapLink />
      </Box>
    </Container>
  );
};

export default Map;
