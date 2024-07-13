import { Box, Button, Typography } from "@mui/material";

const LocationRequest = () => {
  const locationPermission = () => {
    function success(pos) {
      const crd = pos.coords;

      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
    navigator.geolocation.getCurrentPosition(success);
  };
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      my={3}
      gap={2}
      alignItems="center"
    >
      <Typography variant="h6" align="center">
        To submit surveys, please activate location permission using the button
        below. You will be prompted for permission please choose "Allow".
      </Typography>
      <Button variant="outlined" onClick={locationPermission}>
        Activate
      </Button>
    </Box>
  );
};

export default LocationRequest;
