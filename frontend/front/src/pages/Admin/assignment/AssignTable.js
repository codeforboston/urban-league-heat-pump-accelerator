import { Box, Button, MenuItem, Stack } from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  useAddAssignmentsToSurveyorMutation,
  useGetAssignmentsQuery,
  useGetSurveyorsQuery,
  useRemoveAssignmentsFromSurveyorMutation,
} from "../../../api/apiSlice";
import {
  useGoToBreadcrumb,
  useInitBreadcrumbs,
} from "../../../hooks/breadcrumbHooks";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import CustomSnackbar from "../../../components/CustomSnackbar";
import Loader from "../../../components/Loader";
import { ADMIN_ASSIGNMENT, withAdminPrefix } from "../../../routing/routes";

const AssignTable = () => {
  const goToBreadcrumb = useGoToBreadcrumb();
  useInitBreadcrumbs(
    [{ url: withAdminPrefix(ADMIN_ASSIGNMENT), description: "assignments" }],
    true
  );

  const [selectedSurveyor, setSelectedSurveyor] = useState("");
  const [selectedAssignments, setSelectedAssignments] = useState([]);

  // Event handlers
  const handleChange = (event) => {
    setSelectedSurveyor(event.target.value);
  };

  const handleSelectionModelChange = (newSelection) => {
    console.log(newSelection);
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
    console.log(selectedSurveyor);
    console.log(selectedAssignments);
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

  const handleAssignmentLink = (assignment) => {
    goToBreadcrumb("assignment", assignment);
  };
  // DataGrid columns
  const columns = [
    {
      field: "id",
      headerName: "Id #",
      maxWidth: 50,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => handleAssignmentLink(params.row)}
          sx={{ minWidth: "fit-content", width: "auto" }}
        >
          {params.row.id}
        </Button>
      ),
    },
    {
      field: "surveyorData",
      headerName: "Surveyor(s)",
      minWidth: 150,
      flex: 2,
      renderCell: (params) => {
        return params.row.surveyorData ? (
          <Stack
            direction="row"
            maxWidth="100%"
            justifyContent="flex-start"
            overflow="scroll"
            sx={{ overflowY: "auto", overflowX: "auto" }}
            flexWrap="wrap"
          >
            {params.row.surveyorData.map((surveyor) => {
              return (
                <Button
                  key={`surveyor-${surveyor.id}`}
                  onClick={() => handleUserLink(surveyor)}
                  sx={{
                    textAlign: "left",
                    minWidth: "max-content",
                  }}
                >
                  {`${surveyor.firstname} ${surveyor.lastname}`}
                </Button>
              );
            })}
          </Stack>
        ) : (
          "Unassigned"
        );
      },
    },
    {
      field: "completed",
      headerName: "Completion",
      width: "min-content",
      maxWidth: 110,
      flex: 1,
      renderCell: (params) => {
        let completed = 0;
        params.row.homes.forEach((home) => {
          if (home?.completed === true) {
            completed++;
          }
        });
        return `${completed}/${params.row.homes.length} ${
          completed === params.row.homes.length && completed > 0 ? "✅" : ""
        }`;
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

      <Stack
        direction={["column", null, null, "row"]}
        spacing={1}
        py={3}
        gap={1}
      >
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
        <Stack direction="row" gap={1}>
          <Button size="large" variant="outlined" onClick={handleAddSurveyor}>
            Add
          </Button>
          <Button
            size="large"
            variant="outlined"
            onClick={handleRemoveSurveyor}
          >
            Remove
          </Button>
        </Stack>
      </Stack>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          getRowHeight={() => "auto"}
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
