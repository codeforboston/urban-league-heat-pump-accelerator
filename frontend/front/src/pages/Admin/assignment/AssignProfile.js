import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import AssignProfileTable from "../../../dummyData/assignProfileTable.json";

// const columns = [
//   { id: "hid", label: "HomeId", minWidth: 50 },
//   { id: "address", label: "Address", minWidth: 50 },
//   { id: "zipcode", label: "Zip Code", minWidth: 50 },
//   { id: "city", label: "City", minWidth: 50 },
//   { id: "surveyor", label: "Surveyor", minWidth: 50 },
//   { id: "completed", label: "Completed", minWidth: 50 },
// ];

const rows = AssignProfileTable;

const columns = [
  { field: "id", headerName: "HomeId", width: 100 },
  {
    field: "surveyor",
    headerName: "Surveyor",
    width: 200,
  },
  { field: "address", headerName: "Address", width: 200 },
  { field: "zipcode", headerName: "Zipcode", width: 120 },
  {
    field: "city",
    headerName: "City",
    width: 200,
  },
  {
    field: "completed",
    headerName: "Completed",
    width: 200,
  },

  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

const AssignProfile = () => {
  const { aid } = useParams();
  const navigate = useNavigate();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box>
      <Box textAlign="center" m={5}>
        <Typography variant="h3">Assignment Id: {aid}</Typography>
      </Box>

      <Box p={3} flexDirection="row" display="flex">
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Surveyor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Surveyor"
              onChange={handleChange}
            >
              <MenuItem value={"Jane"}>Jane Austin</MenuItem>
              <MenuItem value={"Allen"}>Allen Poe</MenuItem>
              <MenuItem value={"Clark"}>Clark Kent</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button
            size={"large"}
            variant="outlined"
            sx={{ padding: 1.6, ml: 3 }}
          >
            Select
          </Button>
        </Box>
      </Box>

      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          checkboxSelection
        />
      </div>
    </Box>
  );
};

export default AssignProfile;
