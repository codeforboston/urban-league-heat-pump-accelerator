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
import ContainerAdmin from "../component/ContainerAdmin";

const rows = AssignProfileTable;

const AssignProfile = () => {
  const { aid } = useParams();
  const navigate = useNavigate();
  const [surveyor, setSurveyor] = React.useState("");

  const handleChange = (event) => {
    setSurveyor(event.target.value);
  };

  const columns = [
    { field: "id", headerName: "HomeId", maxWidth: 100, flex: 1 },
    {
      field: "surveyor",
      headerName: "Surveyor",
      minWidth: 250,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() => navigate(`/admin/user/userprofile/${params.row.id}`)}
        >
          {params.row.surveyor}
        </Button>
      ),
    },
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
    {
      field: "remove",
      headerName: "remove from assignment",
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="text"
          color="error"
          size="small"
          onClick={() => console.log("remove clicked")}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <ContainerAdmin>
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
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          checkboxSelection
          autoHeight
        />
      </div>
    </ContainerAdmin>
  );
};

export default AssignProfile;
