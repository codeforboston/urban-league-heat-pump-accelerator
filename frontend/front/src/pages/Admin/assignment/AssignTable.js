import { useMemo } from "react";
import { Box, Button, Chip, Stack } from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
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
import { ADMIN_ASSIGNMENT, withAdminPrefix } from "../../../routing/routes";
import CustomSnackbar from "../../../components/CustomSnackbar";
import Loader from "../../../components/Loader";
import SurveyorSelector from "./SurveyorSelect";

const AssignTable = () => {
  const goToBreadcrumb = useGoToBreadcrumb();
  useInitBreadcrumbs(
    [{ url: withAdminPrefix(ADMIN_ASSIGNMENT), description: "assignments" }],
    true
  );

  const apiRef = useGridApiRef();

  // GET hooks
  const {
    data: assignmentsData,
    error: isAssignmentsError,
    isLoading: isAssignmentsDataLoading,
    isFetching: isAssignmentsDataFetching,
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
      isAssignmentsDataFetching ||
      isSurveyorsDataLoading,
    [
      isAddAssignmentLoading,
      isAssignmentsDataLoading,
      isAssignmentsDataFetching,
      isRemoveAssignmentLoading,
      isSurveyorsDataLoading,
    ]
  );

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
            sx={{ overflowY: "auto", overflowX: "auto", pl: 2 }}
            flexWrap="wrap"
          >
            {params.row.surveyorData.map((surveyor) => {
              return (
                <Chip
                  key={`surveyor-${surveyor.id}`}
                  label={`${surveyor.firstname} ${surveyor.lastname}`}
                  color="primary"
                  variant="outlined"
                  onClick={() => handleUserLink(surveyor)}
                  onDelete={() =>
                    removeAssignmentsFromSurveyor({
                      surveyorId: surveyor.id,
                      assignmentIds: [params.row.id],
                    })
                  }
                />
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

      <SurveyorSelector
        surveyorsData={surveyorsData}
        apiRef={apiRef}
        addAssignmentsToSurveyor={addAssignmentsToSurveyor}
        removeAssignmentsFromSurveyor={removeAssignmentsFromSurveyor}
      />

      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          apiRef={apiRef}
          rows={tableData}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          getRowHeight={() => "auto"}
          disableSelectionOnClick
          autoHeight
          checkboxSelection
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 25 } },
          }}
          pageSizeOptions={[25, 50, 100]}
        />
      </Box>
    </Box>
  );
};

export default AssignTable;
