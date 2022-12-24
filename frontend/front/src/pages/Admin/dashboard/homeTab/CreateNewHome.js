import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CreateNewHome = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/admin");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box width={500} mt={5}>
        <Box sx={{ bgcolor: "primary.main", color: "white" }} p={1}>
          <Typography variant="h5">Create New Home</Typography>
        </Box>
        <TextField
          label="Street Number"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <TextField
          label="Address"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <TextField
          label="Zip code"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <TextField
          label="City"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <Box pt={5} textAlign="right">
          <Button variant="outlined" sx={{ ml: 2 }}>
            Create
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={handleCancel}
            color="error"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateNewHome;
