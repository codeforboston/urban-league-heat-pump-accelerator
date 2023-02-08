import { Box, Button, IconButton, TextField } from "@mui/material";
import React from "react";
import OnlineSurveyTable from "./OnlineSurveyTable";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box m={3} display="flex" alignItems="center">
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            helperText="Search by Address, ZipCode, Surevyor, Status"
          />
          <IconButton color="inherit">
            <SearchIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
        <Box m={2}>
          <Button
            variant="contained"
            component={Link}
            startIcon={<AddIcon />}
            to="createHome"
          >
            Create Online Survey
          </Button>
        </Box>
      </Box>

      <OnlineSurveyTable />
    </Box>
  );
};

export default Home;
