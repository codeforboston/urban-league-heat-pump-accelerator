import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import AssignProfileTable from "../../../dummyData/assignProfileTable.json";
import ContainerTitle from "../component/ContainerTitle";

const rows = AssignProfileTable;

const Unassigned = () => {
  const navigate = useNavigate();
  const [surveyor, setSurveyor] = React.useState("");
  const [assignment, setAssignment] = React.useState("");

  const handleChange = (event) => {
    setSurveyor(event.target.value);
  };

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

  // const handleAddSurveyor = () => {
  //   console.log(`add ${surveyor} to this selected home id`, selectionModel);
  // };
  // const handleRemoveSurveyor = () => {
  //   console.log(
  //     `remove ${surveyor} from this selected home id`,
  //     selectionModel
  //   );
  // };

  const columns = [
    { field: "id", headerName: "HomeId", maxWidth: 100, flex: 1 },
    // {
    //   field: "surveyor",
    //   headerName: "Surveyor",
    //   minWidth: 250,
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Button
    //       variant="text"
    //       color="primary"
    //       size="small"
    //       onClick={() => navigate(`/admin/user/userprofile/${params.row.id}`)}
    //     >
    //       {params.row.surveyor}
    //     </Button>
    //   ),
    // },
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
      renderCell: (params) => (
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
      ),
    },
    {
      field: "hid",
      headerName: "Home Link",
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
      {/* <Box py={1} flexDirection="row" display="flex">
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
              <MenuItem value={"Jane"}>Jane Austin</MenuItem>
              <MenuItem value={"Allen"}>Allen Poe</MenuItem>
              <MenuItem value={"Clark"}>Clark Kent</MenuItem>
              <MenuItem value={"Clark"}>No Surveyor</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          size="large"
          sx={{ mb: 2.5, px: 3, py: 1.5, mx: 4 }}
          variant="outlined"
          onClick={handleAddSurveyor}
        >
          Add
        </Button>
        <Button
          size="large"
          sx={{ mb: 2.5, px: 3, py: 1.5, mx: 1 }}
          variant="outlined"
          onClick={handleRemoveSurveyor}
        >
          Remove
        </Button>
      </Box> */}

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
