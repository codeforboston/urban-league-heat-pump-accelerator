import * as React from "react";

import { Box, Button, MenuItem } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import {
  useGetAssignmentsQuery,
  useGetSurveyorsQuery,
} from "../../../api/apiSlice";
import Loader from "../../../components/Loader";
import CustomSnackbar from "../../../components/CustomSnackbar";
import { useDispatch } from "react-redux";
import { setBreadcrumbs } from "../../../features/breadcrumb/breadcrumbSlice";
import { useGoToBreadcrumb } from "../../../hooks/useGoToBreadcrumb";

const AssignTable = () => {
  const dispatch = useDispatch();
  const goToBreadcrumb = useGoToBreadcrumb();
  dispatch(
    setBreadcrumbs([
      { url: "/admin/dashboard", description: "dashboard" },
      { url: "/admin/assignment", description: "assignments" },
    ])
  );
  const navigate = useNavigate();
  const [surveyor, setSurveyor] = React.useState("");
  const [selectionModel, setSelectionModel] = React.useState([]);

  // Event handlers
  const handleChange = (event) => {
    setSurveyor(event.target.value);
  };

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
    console.log("Selected IDs:", newSelection);
  };

  const handleAddSurveyor = () => {
    console.log(
      `add ${surveyor} to this selected assignment id`,
      selectionModel
    );
  };

  const handleRemoveSurveyor = () => {
    console.log(
      `remove ${surveyor} from this selected assignment id`,
      selectionModel
    );
  };

  const handleUserLink = (user) => goToBreadcrumb("user", user);
  
  const handleAssignmentLink = (assignment) =>
    goToBreadcrumb("assignment", assignment);

  // GET hooks
  const {
    data: assignmentsData,
    isError: isAssignmentsError,
    isLoading: isAssignmentsDataLoading,
  } = useGetAssignmentsQuery();

  const {
    data: surveyorsData,
    isError: isSurveyorsError,
    isLoading: isSurveyorsDataLoading,
  } = useGetSurveyorsQuery();

  // DataGrid columns
  const columns = [
    { field: "id", headerName: "Assign. Id", maxWidth: 100, flex: 1 },
    {
      field: "surveyor_ids",
      headerName: "Surveyor(s)",
      width: 150,
      flex: 1,
      renderCell: (params) => {
        return params.row.surveyor_ids
          ? params.row.surveyor_ids.map((id) => {
              const surveyor = surveyorsData.find((surveyor) => {
                return surveyor.id === id;
              });
              return (
                <Button
                  key={`surveyor-${id}`}
                  onClick={() => handleUserLink(surveyor)}
                >
                  {`${surveyor.firstname} ${surveyor.lastname}`}
                </Button>
              );
            })
          : "Unassigned";
      },
    },
    {
      field: "completed",
      headerName: "Completion",
      width: 110,
      flex: 1,
      renderCell: (params) => {
        let completed = 0;
        params.row.homes.forEach((home) => {
          if (home?.completed === true) {
            completed++;
          }
        });
        return `${completed}/${params.row.homes.length}`;
      },
    },
    {
      field: "assignment",
      headerName: "Assignment",
      width: 110,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() => handleAssignmentLink(params.row)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Box>
      {isAssignmentsDataLoading || isSurveyorsDataLoading ? (
        <Loader />
      ) : isAssignmentsError ? (
        <CustomSnackbar
          open={isAssignmentsError}
          message="Error fetching surveyor assignment data"
          severity="error"
        />
      ) : isSurveyorsError ? (
        <CustomSnackbar
          open={isSurveyorsError}
          message="Error fetching surveyor user data"
          severity="error"
        />
      ) : (
        <>
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
                  {surveyorsData.map((surveyor) => (
                    <MenuItem key={surveyor.id} value={surveyor.id}>
                      {surveyor.firstname + " " + surveyor.lastname}
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
              rows={assignmentsData}
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
        </>
      )}
    </Box>
  );
};

export default AssignTable;
