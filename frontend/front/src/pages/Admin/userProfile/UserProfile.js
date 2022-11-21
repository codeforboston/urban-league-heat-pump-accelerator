import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { uid } = useParams();
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box width={500} mt={5}>
        <Box sx={{ bgcolor: "primary.main", color: "white" }} p={1}>
          <Typography variant="h5">User Profile</Typography>
        </Box>
        <TextField
          disabled={isDisabled}
          label="First Name"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <TextField
          disabled={isDisabled}
          label="Last Name"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <TextField
          disabled={isDisabled}
          label="Email"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <TextField
          disabled={isDisabled}
          label="Phone"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <TextField
          disabled={isDisabled}
          label="Street Address"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />{" "}
        <TextField
          disabled={isDisabled}
          label="City"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />{" "}
        <TextField
          disabled={isDisabled}
          label="Zip Code"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />{" "}
        <TextField
          disabled={isDisabled}
          label="State"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />

        {/* BUTTONS */}
        <Box sx={{ "display": "flex", "justify-content": "space-between" }}>
          <Box pt={5} textAlign="left">
            <Button variant="contained" sx={{ ml: 2 }}>
              CHANGE PASSWORD
            </Button>
          </Box>
          <Box pt={5} textAlign="right">
            <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setIsDisabled(!isDisabled)}>
              EDIT
            </Button>
            <Button variant="outlined" sx={{ ml: 2 }} color="error">
              DELETE
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
