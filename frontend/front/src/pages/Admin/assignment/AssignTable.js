import { Box, Button, MenuItem, Stack } from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  useAddAssignmentsToSurveyorMutation,
  useGetAssignmentsQuery,
  useGetSurveyorsQuery,
  useRemoveAssignmentsFromSurveyorMutation,
} from "../../../api/apiSlice";

import CustomSnackbar from "../../../components/CustomSnackbar";
import { DataGrid } from "@mui/x-data-grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Loader from "../../../components/Loader";
import Select from "@mui/material/Select";
import { setBreadcrumbs } from "../../../features/breadcrumb/breadcrumbSlice";
import { useDispatch } from "react-redux";
import { useGoToBreadcrumb } from "../../../hooks/useGoToBreadcrumb";

const AssignTable = () => {
  const dispatch = useDispatch();
  const goToBreadcrumb = useGoToBreadcrumb();
  dispatch(
    setBreadcrumbs([{ url: "/admin/assignment", description: "assignments" }])
  );

  const [selectedSurveyor, setSelectedSurveyor] = useState("");
  const [selectedAssignments, setSelectedAssignments] = useState([]);

  // Event handlers
  const handleChange = (event) => {
    setSelectedSurveyor(event.target.value);
  };

  const handleSelectionModelChange = (newSelection) => {
    setSelectedAssignments(newSelection);
  };

  // GET hooks
  const {
    data: assignmentsData,
    error: isAssignmentsError,
    isLoading: isAssignmentsDataLoading,
  } = useGetAssignmentsQuery();

  const {
    data: surveyorsData,
    error: isSurveyorsError,
    isLoading: isSurveyorsDataLoading,
  } = useGetSurveyorsQuery();

  const tableData = useMemo(
    () =>
      assignmentsData && surveyorsData
        ? assignmentsData.map((a) => ({
            ...a,
            surveyorData: a.surveyor_ids.map((id) =>
              surveyorsData.find((s) => s.id === id)
            ),
          }))
        : [],
    [assignmentsData, surveyorsData]
  );

  const [
    addAssignmentsToSurveyor,
    { isLoading: isAddAssignmentLoading, error: addAssignmentError },
  ] = useAddAssignmentsToSurveyorMutation();
  const [
    removeAssignmentsFromSurveyor,
    { isLoading: isRemoveAssignmentLoading, error: removeAssignmentError },
  ] = useRemoveAssignmentsFromSurveyorMutation();

  const isAssignmentUpdateLoading = useMemo(
    () =>
      isAddAssignmentLoading ||
      isRemoveAssignmentLoading ||
      isAssignmentsDataLoading ||
      isSurveyorsDataLoading,
    [
      isAddAssignmentLoading,
      isAssignmentsDataLoading,
      isRemoveAssignmentLoading,
      isSurveyorsDataLoading,
    ]
  );

  const handleAddSurveyor = () => {
    addAssignmentsToSurveyor({
      surveyorId: selectedSurveyor,
      assignmentIds: selectedAssignments,
    });
  };

  const handleRemoveSurveyor = () => {
    removeAssignmentsFromSurveyor({
      surveyorId: selectedSurveyor,
      assignmentIds: selectedAssignments,
    });
  };

  const handleUserLink = (user) => goToBreadcrumb("user", user);

  const handleAssignmentLink = (assignment) =>
    goToBreadcrumb("assignment", assignment);

  // DataGrid columns
  const columns = [
    { field: "id", headerName: "Assign. Id", maxWidth: 100, flex: 1 },
    {
      field: "assignment",
      headerName: "Assignment",
      minWidth: 110,
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
      field: "surveyorData",
      headerName: "Surveyor(s)",
      width: 150,
      flex: 1,
      renderCell: (params) => {
        return params.row.surveyorData
          ? params.row.surveyorData.map((surveyor) => {
              return (
                <Button
                  key={`surveyor-${surveyor.id}`}
                  onClick={() => handleUserLink(surveyor)}
                >
                  {`${surveyor.firstname} ${surveyor.lastname}`}
                </Button>
              );
            })
          : "Unassigned";
      },
    },
  ];

  return (
    <Box>
      {isAssignmentUpdateLoading && <Loader />}
      {!!isAssignmentsError && (
        <CustomSnackbar
          message="Error fetching surveyor assignment data"
          severity="error"
        />
      )}
      {!!isSurveyorsError && (
        <CustomSnackbar
          message="Error fetching surveyor user data"
          severity="error"
        />
      )}
      {!!addAssignmentError && (
        <CustomSnackbar message="Error adding assignment" severity="error" />
      )}

      {!!removeAssignmentError && (
        <CustomSnackbar message="Error removing assignment" severity="error" />
      )}

      <Stack direction="row" spacing={1} py={3}>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Surveyor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedSurveyor}
              label="Surveyor"
              onChange={handleChange}
            >
              {(surveyorsData || []).map((surveyor) => (
                <MenuItem key={surveyor.id} value={surveyor.id}>
                  {`${surveyor.firstname} ${surveyor.lastname}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button size="large" variant="outlined" onClick={handleAddSurveyor}>
          Add
        </Button>
        <Button size="large" variant="outlined" onClick={handleRemoveSurveyor}>
          Remove
        </Button>
      </Stack>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          disableSelectionOnClick
          autoHeight
          checkboxSelection
          onSelectionModelChange={handleSelectionModelChange}
          selectionModel={selectedAssignments}
        />
      </Box>
    </Box>
  );
};

export default AssignTable;
