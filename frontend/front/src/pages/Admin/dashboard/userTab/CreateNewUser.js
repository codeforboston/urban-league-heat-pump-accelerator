import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const CreateNewUser = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box width={500} mt={5}>
        <Box sx={{ bgcolor: "primary.main", color: "white" }} p={1}>
          <Typography variant="h5">Create User Profile</Typography>
        </Box>
        <TextField
          label="First Name"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <TextField
          label="Last Name"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <TextField
          label="Email"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <TextField
          label="Phone"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <TextField
          label="Street Address"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />{" "}
        <TextField
          label="City"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />{" "}
        <TextField
          label="Zip Code"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />{" "}
        <TextField
          label="State"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <Box pt={5} textAlign="right">
          <Button variant="outlined" sx={{ ml: 2 }}>
            Create
          </Button>
          <Button variant="outlined" sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateNewUser;
