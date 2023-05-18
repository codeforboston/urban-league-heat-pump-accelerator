import { Button, Container } from "@mui/material";

import { Box } from "@mui/system";
import React from "react";

const cluster1 = [];

function openGoogleMaps(locations) {
  const origin = locations[0];
  const destination = locations[locations.length - 1];

  const waypoints = locations
    .slice(1, -1)
    .map((location) => `${location.lat},${location.lng}`)
    .join("|");

  const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&waypoints=${waypoints}&travelmode=walking`;

  window.open(url, "_blank");
}

const MapLink = () => {
  // const locations = [
  //   { lat: 37.7749, lng: -122.4194 }, // San Francisco
  //   { lat: 37.774929, lng: -122.419416 }, // San Francisco City Hall
  //   { lat: 37.789602, lng: -122.390317 }, // Ferry Building
  //   { lat: 37.805726, lng: -122.412465 }, // Lombard Street
  // ];

  const bostonlocation = [];

  const calclocation = () => {
    for (let i = 0; i < cluster1.length; i++) {
      const lat = parseFloat(cluster1[i].latitude);
      const lng = parseFloat(cluster1[i].longitude);
      bostonlocation.push({ lat: lat, lng: lng });
    }
  };

  calclocation();

  // break the bostonlocation into smaller 10 set of chunk for directions
  const chunkSize = 10;
  const locationSets = Array.from(
    { length: Math.ceil(bostonlocation.length / chunkSize) },
    (_, index) =>
      bostonlocation.slice(index * chunkSize, (index + 1) * chunkSize)
  );

  console.log(locationSets);

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
      >
        {locationSets.map((locations, index) => (
          <Box m={2} key={index} width={300}>
            <Button
              variant="contained"
              size={"large"}
              onClick={() => openGoogleMaps(locations)}
              fullWidth
            >
              Open Google Maps {index * 10} - {(index + 1) * 10}
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default MapLink;
