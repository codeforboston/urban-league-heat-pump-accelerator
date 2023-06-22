import { Box, Button, Typography } from "@mui/material";

import ContainerTitle from "../component/ContainerTitle";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetAssignmentQuery,
  useGetSurveyorsQuery,
} from "../../../api/apiSlice";
import Loader from "../../../components/Loader";
import CustomSnackbar from "../../../components/CustomSnackbar";
import { getAddress } from "../home/HomeTable";
import { useGoToBreadcrumb } from "../../../hooks/useGoToBreadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBreadcrumbs,
  setBreadcrumbs,
} from "../../../features/breadcrumb/breadcrumbSlice";

const AssignProfile = () => {
  const { aid } = useParams();
  const goToBreadcrumb = useGoToBreadcrumb();
  const dispatch = useDispatch();
  const thereAreBreadcrumbs = useSelector(selectBreadcrumbs).length;
  
  if (!thereAreBreadcrumbs) {
    dispatch(
      setBreadcrumbs([
        { url: "/admin/dashboard", description: "dashboard" },
        { url: "/admin/assignment", description: "assignments" },
        {
          url: `/admin/assignment/assignProfile/${aid}`,
          description: `assignment ${aid}`,
        },
      ])
    );
  }

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
  const handleHomeLink = (home) => goToBreadcrumb("home", home);

  const columns = [
    { field: "id", headerName: "HomeId", maxWidth: 100, flex: 1 },
    { field: "visit_order", headerName: "Visit order", maxWidth: 100, flex: 1 },
    {
      field: "address",
      valueGetter: getAddress,
      headerName: "Address",
      minWidth: 200,
      maxWidth: 300,
      flex: 1.5,
    },
    {
      field: "zip_code",
      headerName: "Zipcode",
      renderCell: (params) =>
        params.row.zip_code.length === 5
          ? params.row.zip_code
          : `0${params.row.zip_code}`,
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
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() => handleUserLink(params.row)}
        >
          View
        </Button>
      ),
    },
    {
      field: "hid",
      headerName: "Home",
      minWidth: 50,
      maxWidth: 80,
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() => handleHomeLink(params.row)}
        >
          View
        </Button>
      ),
    },
    {
      field: "unassign",
      headerName: "Unassign",
      minWidth: 50,
      maxWidth: 80,
      renderCell: (params) => (
        <Button
          variant="text"
          color="error"
          size="small"
          onClick={() =>
            console.log(`clicked unassign home id: ${params.row.id}`)
          }
        >
          X
        </Button>
      ),
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
            <Box
              py={3}
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography variant="h5" sx={{ mr: 3 }}>
                Assigned Surveyor(s):
              </Typography>
              {surveyors.map((surveyor) => (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleUserLink(surveyor)}
                >
                  {`${surveyor.lastname}, ${surveyor.firstname}`}
                </Button>
              ))}
            </Box>
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
