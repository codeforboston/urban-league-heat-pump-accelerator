import React, { useEffect, useRef, useState } from "react";
import GoogleMap from "./GoogleMap";
import cluster1 from "../../../dummyData/homeDataCluster1.json";
import { Box, Container } from "@mui/material";
import MapLink from "./MapLink";

console.log(cluster1);

const locations = [
  { lat: 37.7749, lng: -122.4194 }, // San Francisco
  { lat: 37.3382, lng: -121.8863 }, // San Jose
  { lat: 37.7749, lng: -122.4194 }, // San Francisco
];

const Map = () => {
  const bostonlocation = [];

  const calclocation = () => {
    for (let i = 0; i < 25; i++) {
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
        {<GoogleMap locations={bostonlocation} travelMode="WALKING" />}

        <MapLink />
      </Box>
    </Container>
  );
};

export default Map;
