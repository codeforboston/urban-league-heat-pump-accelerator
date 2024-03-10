import { Box, Button, IconButton, Stack, TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ContainerTitle from "../component/ContainerTitle";
import HomeTable from "./HomeTable";
import { Link } from "react-router-dom";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  return (
    <ContainerTitle name="HOMES">
      <Stack
        display="flex"
        justifyContent="space-between"
        alignItems={["flex-start", null, null, "center"]}
        direction={["column", null, null, "row"]}
        mb={1}
      >
        {/* <Box m={1} display="flex" alignItems="center">
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            helperText="Search by address, zipcode, surveyor, or status"
          />
          <IconButton color="inherit">
            <SearchIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box> */}
        <Button
          variant="contained"
          component={Link}
          startIcon={<AddIcon />}
          to="createHome"
        >
          Create New Home
        </Button>
      </Stack>

      <HomeTable />
    </ContainerTitle>
  );
};

export default Home;
