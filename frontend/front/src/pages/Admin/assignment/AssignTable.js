import * as React from "react";

import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import ContainerTitle from "../component/ContainerTitle";
import data from "../../../dummyData/userSelection.json";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link, useNavigate } from "react-router-dom";
import RowData from "../../../dummyData/assignTable.json";
import { DataGrid } from "@mui/x-data-grid";

const rows = RowData;

const AssignTable = () => {
  const navigate = useNavigate();
  const [surveyor, setSurveyor] = React.useState("");

  const handleChange = (event) => {
    setSurveyor(event.target.value);
  };

  const handRowClick = (params, event) => {
    navigate(`assignProfile/${params.id}`);
  };

  const [selectionModel, setSelectionModel] = React.useState([]);

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
    console.log("Selected IDs:", newSelection);
  };

  const handleAddSurveyor = () => {
    console.log(`add ${surveyor} to this selected home id`, selectionModel);
  };
  const handleRemoveSurveyor = () => {
    console.log(
      `remove ${surveyor} from this selected home id`,
      selectionModel
    );
  };
  const handleNameClick = (event, item) => {
    event.stopPropagation();

    return navigate(`/admin/user/userprofile/${item.id}`);
  };
  const columns = [
    { field: "id", headerName: "Id", maxWidth: 100, flex: 1 },
    {
      field: "assigned",
      headerName: "Assigned",
      width: 150,
      flex: 1,
      renderCell: (params) =>
        Object.values(params.row.assigned).map((item) => {
          return (
            <Button
              key={item.id + item.firstName}
              onClick={(event) => handleNameClick(event, item)}
            >
              {`${item.firstName} ${item.lastName}`}
            </Button>
          );
        }),
    },
    { field: "homeCount", headerName: "Home", width: 110, flex: 1 },
    { field: "surveyed", headerName: "Status", width: 110, flex: 1 },
    { field: "completed", headerName: "Completed", width: 110, flex: 1 },
    {
      field: "view",
      headerName: "View",
      width: 110,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() => navigate(`assignProfile/${params.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Box>
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
      </Box>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          disableSelectionOnClick
          autoHeight
          checkboxSelection
          onSelectionModelChange={handleSelectionModelChange}
          selectionModel={selectionModel}
        />
      </Box>
    </Box>
  );
};

export default AssignTable;
