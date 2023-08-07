import { Box, Button } from "@mui/material";
import {
  useGoToBreadcrumb,
  useInitBreadcrumbs,
} from "../../../hooks/breadcrumbHooks";

import CustomSnackbar from "../../../components/CustomSnackbar";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../../components/Loader";
import React from "react";
import { 
  useGetHomesQuery, 
  useGetSurveyVisitsQuery
} from "../../../api/apiSlice";
import { useNavigate } from "react-router-dom";

// Formats addresses
export const getAddress = (params) => {
  let unit_number = "";
  if (params.getValue(params.id, "unit_number")) {
    unit_number = `, Unit #${params.getValue(params.id, "unit_number")}`;
  }
  return `${params.getValue(params.id, "street_number")} ${params.getValue(
    params.id,
    "street_name"
  )}${unit_number && unit_number}`;
};

const HomeTable = () => {
  const goToBreadcrumb = useGoToBreadcrumb();
  const navigate = useNavigate();

  useInitBreadcrumbs([
    { url: "/admin/dashboard", description: "dashboard" },
    { url: "/admin/home", description: "homes" },
  ]);

  const handleHomeLink = (home) => goToBreadcrumb("home", home);
  const handleUserLink = (visit) => navigate('/admin/survey/visit/' + visit) 

  const handleAssignmentLink = (assignment) =>
    goToBreadcrumb("assignment", assignment);

  const columns = [
    {
      field: "id", 
      headerName: "Id", 
      minWidth: 80 
    },
    {
      field: "address",
      valueGetter: getAddress,
      headerName: "Address",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 100,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "zip_code",
      headerName: "Zip Code",
      minWidth: 100,
      maxWidth: 100,
      flex: 0.8,
    },
    {
      field: "completed",
      headerName: "Completed",
      renderCell: (params) => (params.row.completed === true ? <Button
        variant="text"
        sx={{minWidth: "unset", padding: '0px'}}
        color="primary"
        size="small"
        onClick={() => handleUserLink(params.row.survey_id)}
      >
        Yes
      </Button> : "No"),
      minWidth: 100,
      maxWidth: 150,
      flex: 0.8,
    },
    {
      field: "assignment_id",
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() => handleAssignmentLink(params.row)}
        >
          {params.row.assignment_id}
        </Button>
      ),
      headerName: "Assignment",
      width: 110,
    },
    {
      field: "home",
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
      headerName: "Home",
      maxWidth: 80,
    },
  ];

  const {
    data: fetchedHomesData,
    isError: isFetchedHomesError,
    isLoading: isHomesDataLoading,
  } = useGetHomesQuery();
  const {
    data: surveyVisitsData,
    isError: isSurveyVisitsError,
    isLoading: isSurveyVisitsDataLoading,
  } = useGetSurveyVisitsQuery()

  let homesData = [];

  if (surveyVisitsData && fetchedHomesData) {
    homesData = Object.values(fetchedHomesData).map(home => {
      const visit = surveyVisitsData.find(visit => visit.home_id === home.id);
      if (visit) {
        return { ...home, completed: true, survey_id: visit.id };
      }
      return home;
    });
  }
  
  const isDataReady = !isHomesDataLoading && !isSurveyVisitsDataLoading && fetchedHomesData
  
  if (!isDataReady) {
    return <Loader />;
  }

  return (
    <Box>
      {isFetchedHomesError ? (
        <CustomSnackbar
          open={isFetchedHomesError}
          message="Error fetching homes data."
          severity="error"
        />
      ) : (
        <>
          {isSurveyVisitsError && (
            <CustomSnackbar
              open={isSurveyVisitsError}
              message="Error fetching Survey Visits data."
              severity="error"
            />)}
            <DataGrid
              rows={homesData}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20]}
              disableSelectionOnClick
              autoHeight
            />
        </>
      )
}
    </Box>
  );
};

export default HomeTable;
