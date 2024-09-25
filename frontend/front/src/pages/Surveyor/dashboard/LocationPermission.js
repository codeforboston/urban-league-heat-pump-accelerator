import { Alert, Box, Button, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const LocationPermission = () => {
  const [disableLocButn, setDisableLocBtn] = useState(false);
  const [err, setErr] = useState(false);
  const [errType, setErrType] = useState("");
  const [locationStatus, setLocationStatus] = useState("Off");

  const locationPermission = () => {
    function success() {
      setErr(false);
      setLocationStatus("On");
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

  useEffect(() => {
    //checking location permission
    navigator.permissions.query({ name: "geolocation" }).then((res) => {
      if (res.state === "prompt") {
        setDisableLocBtn(false);
        setErr(false);
        setLocationStatus("Off");
      } else if (res.state === "denied") {
        setDisableLocBtn(true);
        setErrType("user_denied");
        setErr(true);
        setLocationStatus("Denied");
      } else if (res.state === "granted") {
        setDisableLocBtn(true);
        setErr(false);
        setLocationStatus("On");
      } else {
        setDisableLocBtn(true);
      }
      res.onchange = (e) => {
        if (e.type === "change") {
          const newState = e.target.newState;
          if (newState === "granted" || newState === "denied") {
            if (newState === "granted") {
              setLocationStatus("On");
            }
            if (newState === "denied") {
              setLocationStatus("Denied");
            }
            setDisableLocBtn(true);
          } else {
            setDisableLocBtn(true);
          }
        }
      };
    });
  });

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

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      my={3}
      gap={2}
      alignItems="center"
    >
      <Alert severity="warning">
        To submit surveys, please grant location permission using the "Grant
        Location Permission" button below. You will be prompted for permission
        please select "Allow".
      </Alert>
      {err &&
        (errType === "user_denied" ? (
          permissionDeniedMsg
        ) : (
          <Typography>error</Typography>
        ))}
      <Typography>Location Permission Status: {locationStatus}</Typography>
      <Button
        variant="contained"
        onClick={locationPermission}
        disabled={disableLocButn ? true : false}
      >
        Grant Location Permission
      </Button>
    </Box>
  );
};

export default LocationPermission;
