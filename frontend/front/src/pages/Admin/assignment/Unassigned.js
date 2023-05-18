import { Box, Button } from "@mui/material";

import ContainerTitle from "../component/ContainerTitle";
import { DataGrid } from "@mui/x-data-grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

const rows = [];

const Unassigned = () => {
  const navigate = useNavigate();
  const [assignment, setAssignment] = React.useState("");

  const handleChangeAssignment = (event) => {
    setAssignment(event.target.value);
  };

  const [selectionModel, setSelectionModel] = React.useState([]);

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
    console.log("Selected IDs:", newSelection);
  };

  const handleSentTo = () => {
    console.log("clicked sent to with these home Id:", selectionModel);

    console.log("assignment id:", assignment);
    console.log(
      "delete these home id from unassigned and send them to the assigned id location"
    );
  };

  const columns = [
    { field: "id", headerName: "HomeId", maxWidth: 100, flex: 1 },

    { field: "address", headerName: "Address", width: 200 },
    { field: "zipcode", headerName: "Zipcode", width: 120 },
    {
      field: "city",
      headerName: "City",
      width: 200,
      flex: 1,
    },
    { field: "completed", headerName: "Completed", width: 200, flex: 1 },
    {
      field: "survey",
      headerName: "Survey",
      width: 200,
      flex: 1,
      renderCell: (params) => {
        return params.row.surveyId ? (
          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={() =>
              navigate(`/admin/survey/surveyprofile/${params.row.surveyId}`)
            }
          >
            View
          </Button>
        ) : (
          "No Survey"
        );
      },
    },
    {
      field: "hid",
      headerName: "Home",
      width: 150,
      flex: 1,

      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() => navigate(`/admin/home/homeprofile/${params.row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <ContainerTitle name={"UNASSINGED"}>
      <Box py={1} flexDirection="row" display="flex">
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="assignment-label">Assignment</InputLabel>
            <Select
              labelId="assignment-label"
              id="assignment-selection"
              value={assignment}
              label="Assignment"
              onChange={handleChangeAssignment}
            >
              <MenuItem value={"0"}>0</MenuItem>
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
              <MenuItem value={"4"}>4</MenuItem>
              <MenuItem value={"5"}>5</MenuItem>
              <MenuItem value={"6"}>6</MenuItem>
              <MenuItem value={"7"}>7</MenuItem>
              <MenuItem value={"8"}>8</MenuItem>
              <MenuItem value={"9"}>9</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          size="large"
          sx={{ mb: 2.5, px: 3, py: 1.5, mx: 4 }}
          variant="outlined"
          onClick={handleSentTo}
        >
          Send To
        </Button>
      </Box>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          checkboxSelection
          onSelectionModelChange={handleSelectionModelChange}
          selectionModel={selectionModel}
          autoHeight
        />
      </div>
    </ContainerTitle>
  );
};

export default Unassigned;
