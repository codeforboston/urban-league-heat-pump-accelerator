import { Box, IconButton, TextField } from "@mui/material";

import ContainerTitle from "../component/ContainerTitle";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SurveyTable from "./SurveyTable";

const Home = () => {
  return (
    <ContainerTitle name={"SURVEYS"}>
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
      </Box>

      <SurveyTable />
    </ContainerTitle>
  );
};

export default Home;
