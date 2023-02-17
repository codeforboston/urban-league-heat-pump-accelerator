import React from "react";

import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AssignTable from "./AssignTable";
import ContainerTitle from "../component/ContainerTitle";
import data from "../../../dummyData/userSelection.json";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Assignment = () => {
  const [surveyor, setSurveyor] = React.useState("");

  const handleChange = (event) => {
    setSurveyor(event.target.value);
  };

  return (
    <ContainerTitle name={"ASSIGNMENT"}>
      <Box py={3} flexDirection="row" display="flex">
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Surveyor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={surveyor}
              label="Surveyor"
              onChange={handleChange}
            >
              {data.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.firstName + " " + item.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button
          size="large"
          sx={{ mb: 2.5, px: 3, py: 1.5, mx: 4 }}
          variant="outlined"
        >
          Add
        </Button>
        <Button
          size="large"
          sx={{ mb: 2.5, px: 3, py: 1.5, mx: 1 }}
          variant="outlined"
        >
          Remove
        </Button>
      </Box>

      <AssignTable />
    </ContainerTitle>
  );
};

export default Assignment;
