import { Box, Button, IconButton, Stack, TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContainerTitle from "../component/ContainerTitle";
import HomeTable from "./HomeTable";

const Home = () => {
  const [searchString, setSearchString] = useState("");
  const searchOnChange = (event) => {
    setSearchString(event.target.value);
  };
  return (
    <ContainerTitle name="HOMES">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        
        <Box m={2}>
          <Button
            variant="contained"
            component={Link}
            startIcon={<AddIcon />}
            to="createHome"
          >
            Create New Home
          </Button>
        </Box>
      </Box>

      <HomeTable searchString={searchString} />
    </ContainerTitle>
  );
};

export default Home;
