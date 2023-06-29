import { Box, Button } from "@mui/material";

import ContainerTitle from "../component/ContainerTitle";
import { DataGrid } from "@mui/x-data-grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import {
  useGetAssignmentsQuery,
  useGetUnassignedIncompleteHomesQuery,
} from "../../../api/apiSlice";
import { getAddress } from "../home/HomeTable";
import Loader from "../../../components/Loader";
import CustomSnackbar from "../../../components/CustomSnackbar";

const Unassigned = () => {
  const navigate = useNavigate();
  const [assignment, setAssignment] = React.useState("");

  // Event handlers
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

  // GET hookes
  const {
    data: unassignedIncompleteHomesData,
    isError: isUnassignedIncompleteHomesError,
    isLoading: isUnassignedIncompleteHomesDataLoading,
  } = useGetUnassignedIncompleteHomesQuery();

  const {
    data: assignmentsData,
    isError: isAssignmentsError,
    isLoading: isAssignmentsDataLoading,
  } = useGetAssignmentsQuery();

  const columns = [
    { field: "id", headerName: "HomeId", maxWidth: 100, flex: 1 },

    {
      field: "address",
      valueGetter: getAddress,
      headerName: "Address",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "zip_code",
      headerName: "Zipcode",
      width: 120,
    },
    {
      field: "city",
      headerName: "City",
      width: 200,
      flex: 1,
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

  return isUnassignedIncompleteHomesDataLoading || isAssignmentsDataLoading ? (
    <Loader />
  ) : isUnassignedIncompleteHomesError ? (
    <CustomSnackbar
      open={isUnassignedIncompleteHomesError}
      message="Error fetching unassigned homes data"
      severity="error"
    />
  ) : isAssignmentsError ? (
    <CustomSnackbar
      open={isAssignmentsError}
      message="Error fetching assignments data"
      severity="error"
    />
  ) : (
    <ContainerTitle name={"UNASSIGNED"}>
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
              {assignmentsData.map((assignment) => (
                <MenuItem key={assignment.id} value={assignment.id}>
                  {assignment.id}
                </MenuItem>
              ))}
              <MenuItem key="newAssignment" value="new assignment">
                Create new...
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          size="large"
          sx={{ mb: 2.5, px: 3, py: 1.5, mx: 4 }}
          variant="outlined"
          onClick={handleSentTo}
          disabled={assignment === ""}
        >
          Add Homes to {assignment === "new assignment" ? "" : "Assignment"}{" "}
          {assignment}
        </Button>
      </Box>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={unassignedIncompleteHomesData}
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
