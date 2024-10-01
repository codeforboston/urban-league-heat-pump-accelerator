import { Alert, Box, Button, Link, Typography } from "@mui/material";
import { useState } from "react";

const LocationPermission = () => {
  const [err, setErr] = useState(false);
  const [errType, setErrType] = useState("");
  const [locationStatus, setLocationStatus] = useState("unknown");

  const handleLocationPermission = () => {
    function success() {
      setErr(false);
      setLocationStatus("Granted");
    }
    function error(err) {
      if (err.code === 1) {
        setErrType("user_denied");
      } else {
        setErrType("other");
      }
      setErr(true);
    }
    navigator.geolocation.getCurrentPosition(success, error);
  };

  let permissionDeniedMsg = (
    <Alert severity="error">
      It looks like the location permission was denied, please follow
      instruction below to allow permission
      <ul>
        <li>
          <Link
            href="https://support.google.com/chrome/answer/142065?hl=en&co=GENIE.Platform%3DAndroid&oco=1"
            underline="none"
            target="_blank"
            rel="noopener"
          >
            Chrome on Android
          </Link>
        </li>
        <li>
          <Link
            href="https://support.google.com/chrome/answer/142065?hl=en&co=GENIE.Platform%3DiOS&oco=1"
            underline="none"
            target="_blank"
            rel="noopener"
          >
            Chrome on Iphone
          </Link>
        </li>
        <li>
          <Link
            href="https://support.apple.com/en-us/102647"
            underline="none"
            target="_blank"
            rel="noopener"
          >
            Safari
          </Link>
        </li>
      </ul>
    </Alert>
  );
  let permissionSuccess = (
    <Alert security="success">Location Permission is allowed</Alert>
  );

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      my={3}
      gap={2}
      alignItems="center"
    >
      <Alert severity="warning">
        To submit surveys, please enable your location permission using the
        "Check Location Permission" button below. You will be prompted for
        permission please select "Allow".
      </Alert>
      {err &&
        (errType === "user_denied" ? (
          permissionDeniedMsg
        ) : (
          <Typography>error</Typography>
        ))}
      {locationStatus === "Granted" && permissionSuccess}

      <Button variant="contained" onClick={handleLocationPermission}>
        Check Location Permission
      </Button>
    </Box>
  );
};

export default LocationPermission;
