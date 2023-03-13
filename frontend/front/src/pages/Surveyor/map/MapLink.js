import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
// import cluster from "../../../dummyData/homeDatacluster.json";

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

const MapLink = ({ cluster }) => {
  const bostonlocation = [];

  const calclocation = () => {
    for (let i = 0; i < cluster.length; i++) {
      const lat = parseFloat(cluster[i].latitude);
      const lng = parseFloat(cluster[i].longitude);
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
              Google Map Home {index * chunkSize + 1} -{" "}
              {Math.min((index + 1) * chunkSize, bostonlocation.length)}
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default MapLink;
