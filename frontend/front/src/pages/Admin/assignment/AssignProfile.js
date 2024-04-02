import { Box, Button, Stack, Typography } from "@mui/material";
import {
  useGetAssignmentQuery,
  useGetSurveyorsQuery,
} from "../../../api/apiSlice";
import {
  useGoToBreadcrumb,
  useInitBreadcrumbs,
} from "../../../hooks/breadcrumbHooks";

import ContainerTitle from "../component/ContainerTitle";
import CustomSnackbar from "../../../components/CustomSnackbar";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../../components/Loader";
import React from "react";
import { getAddress } from "../home/HomeTable";
import { useParams } from "react-router-dom";
import {
  adminAssignmentProfile,
  ADMIN_ASSIGNMENT,
  withAdminPrefix,
} from "../../../routing/routes";
import SurveyLink from "../../../components/SurveyLink";

const AssignProfile = () => {
  const { aid } = useParams();
  const goToBreadcrumb = useGoToBreadcrumb();

  useInitBreadcrumbs([
    { url: withAdminPrefix(ADMIN_ASSIGNMENT), description: "assignments" },
    {
      url: withAdminPrefix(adminAssignmentProfile(aid)),
      description: `assignment ${aid}`,
    },
  ]);

  const {
    data: assignmentData,
    isError: isAssignmentError,
    isLoading: isAssignmentDataLoading,
  } = useGetAssignmentQuery(aid);

  const {
    data: surveyorsData,
    isError: isSurveyorsError,
    isLoading: isSurveyorsDataLoading,
  } = useGetSurveyorsQuery();

  const surveyors = surveyorsData
    ? surveyorsData.filter((surveyor) =>
        assignmentData?.surveyor_ids.includes(surveyor.id)
      )
    : "Unassigned";

  const handleUserLink = (user) => goToBreadcrumb("user", user);
  const handleHomeLink = (home) => {
    goToBreadcrumb("home", home);
  };

  const columns = [
    { field: "visit_order", headerName: "Visit order", maxWidth: 100, flex: 1 },
    {
      field: "address",
      valueGetter: getAddress,
      headerName: "Address",
      minWidth: 300,

      renderCell: (params) => (
        <Box minWidth="max-content" m={0}>
          <Button
            onClick={() => handleHomeLink(params.row)}
            sx={{
              textAlign: "left",
              minWidth: "max-content",
              padding: 0,
            }}
          >
            {params.value}
          </Button>
        </Box>
      ),
    },
    {
      field: "zip_code",
      headerName: "Zipcode",
      maxWidth: 100,
    },
    {
      field: "city",
      headerName: "City",
      maxWidth: 200,
      minWidth: 100,
      flex: 0.8,
    },
    {
      field: "completed",
      headerName: "Completed",
      renderCell: (params) => (params.row?.completed ? "Yes" : "No"),
      minWidth: 50,
      maxWidth: 100,
    },
    {
      field: "survey",
      headerName: "Survey",
      minWidth: 50,
      maxWidth: 80,
      renderCell: (params) =>
        params.row.completed ? (
          <SurveyLink
            label="VIEW"
            links={params.row.survey_visit_ids}
            variant="text"
            sx={{ minWidth: "unset", padding: "0px" }}
            color="primary"
            size="small"
          />
        ) : null,
    },

  ];

  return (
    <ContainerTitle name={`Assignment ${aid}`}>
      {isAssignmentDataLoading || isSurveyorsDataLoading ? (
        <Loader />
      ) : isAssignmentError ? (
        <CustomSnackbar
          open={isAssignmentError}
          message="Error fetching surveyor assignment data"
          severity="error"
        />
      ) : isSurveyorsError ? (
        <CustomSnackbar
          open={isSurveyorsError}
          message="Error fetching surveyors data"
          severity="error"
        />
      ) : (
        <Box>
          <Stack
            py={3}
            justifyContent="flex-start"
            alignItems="flex-start"
            gap={1}
            direction={["column", null, null, "row"]}
          >
            <Typography variant="h5" sx={{ mr: 3 }}>
              Assigned Surveyor(s):
            </Typography>
            <Box display="flex" gap={1}>
              {surveyors.map((surveyor) => (
                <Button
                  key={surveyor.id}
                  variant="outlined"
                  color="primary"
                  onClick={() => handleUserLink(surveyor)}
                >
                  {`${surveyor.lastname}, ${surveyor.firstname}`}
                </Button>
              ))}
            </Box>
          </Stack>
          <div style={{ width: "100%" }}>
            <DataGrid
              rows={assignmentData.homes}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20]}
              autoHeight
            />
          </div>
        </Box>
      )}
    </ContainerTitle>
  );
};

export default AssignProfile;
