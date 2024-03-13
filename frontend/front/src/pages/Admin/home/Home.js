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
      <Stack
        display="flex"
        justifyContent="space-between"
        alignItems={["flex-start", null, null, "center"]}
        direction={["column", null, null, "row"]}
        mb={1}
      >
        <Box m={1} display="flex" alignItems="center">
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            helperText="Search by address, zipcode, surveyor, or status"
            onChange={searchOnChange}
          />
          <IconButton color="inherit">
            <SearchIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          component={Link}
          startIcon={<AddIcon />}
          to="createHome"
        >
          Create New Home
        </Button>
      </Stack>

      <HomeTable searchString={searchString} />
    </ContainerTitle>
  );
};

export default Home;
