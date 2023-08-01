import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
} from "@mui/material";
import React, { useState } from "react";

import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MapUnit from "./MapLinkUnit";

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

const MapLink = ({ homeData }) => {
  // no idea what this is used for...
  // eslint-disable-next-line no-unused-vars
  const [dashboardHomeData, setDashboardHomeData] = useState(homeData);

  console.log(dashboardHomeData);

  // loop through the item and push the lat and lng into geolocationArray
  const calGeoLocation = (item, geolocationArray) => {
    for (let i = 0; i < item.length; i++) {
      const lat = parseFloat(item[i].latitude);
      const lng = parseFloat(item[i].longitude);
      geolocationArray.push({ lat: lat, lng: lng });
    }
  };

  const chunkSize = 10;

  // break the dashboardHomeData into smaller 10 set of chunk for directions
  const dataChunk = Array.from(
    { length: Math.ceil(dashboardHomeData.length / chunkSize) },
    (_, index) =>
      dashboardHomeData.slice(index * chunkSize, (index + 1) * chunkSize)
  );

  console.log(dataChunk);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
    >
      {dataChunk.map((item, index) => {
        // for each chunk, create a geolocationArray to store the lat and lng
        const geoLocationArray = [];

        // loop through the item and push the lat and lng into geolocationArray
        calGeoLocation(item, geoLocationArray);

        // count how many items in the chunk is completed
        const completedCount = item.filter((value) => value.completed === true);
        return (
          <Box m={1} key={index} minWidth={400}>
            <Button
              variant="contained"
              size={"large"}
              onClick={() => openGoogleMaps(geoLocationArray)}
              fullWidth
            >
              Google Map Home {index * chunkSize + 1} -{" "}
              {Math.min((index + 1) * chunkSize, dashboardHomeData.length)}
            </Button>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                Completed {completedCount.length}/{item.length}
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <List>
                    {item.map((value, index) => {
                      return <MapUnit value={value} key={index} />;
                    })}
                  </List>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      })}
    </Box>
  );
};

export default MapLink;
