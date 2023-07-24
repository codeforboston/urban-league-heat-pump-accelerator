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
  useGetSurveyVisitsQuery,
} from "../../../api/apiSlice";
import { useNavigate } from "react-router-dom";

import { ADMIN_HOME, withAdminPrefix } from "../../../routing/routes";
import {
  useGetHomesQuery,
  useGetSurveyVisitsQuery,
} from "../../../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { ADMIN_HOME, withAdminPrefix } from "../../../routing/routes";

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

  useInitBreadcrumbs(
    [{ url: withAdminPrefix(ADMIN_HOME), description: "homes" }],
    true
  );

  const handleHomeLink = (home) => goToBreadcrumb("home", home);

  const handleUserLink = (home) => {
    navigate("/admin/survey/visit/" + homeIdToSurveyVisitIdMap[home.id]);
  };

  const handleAssignmentLink = (assignment) =>
    goToBreadcrumb("assignment", assignment);

  const columns = [
    {
      field: "id",
      headerName: "Id",
      minWidth: 80,
    },
    {
      field: "address",
      valueGetter: getAddress,
      headerName: "Address",
      minWidth: 300,
      // maxWidth: 300,
      // flex: 1.5,
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
      renderCell: (params) =>
        params.row.completed === true ? (
          <Button
            variant="text"
            sx={{ minWidth: "unset", padding: "0px" }}
            color="primary"
            size="small"
            onClick={() => handleUserLink(params.row)}
          >
            Yes ✅
          </Button>
        ) : (
          "No"
        ),
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
  ];

  const {
    data: homesData,
    isError: isFetchedHomesError,
    isLoading: isHomesDataLoading,
  } = useGetHomesQuery();
  const {
    data: surveyVisitsData,
    isError: isSurveyVisitsError,
    isLoading: isSurveyVisitsDataLoading,
  } = useGetSurveyVisitsQuery();

  const homeIdToSurveyVisitIdMap = surveyVisitsData
    ? surveyVisitsData.reduce((acc, visit) => {
        return { ...acc, [visit.home_id]: visit.id };
      }, {})
    : {};

  const isDataReady =
    !isHomesDataLoading && !isSurveyVisitsDataLoading && homesData;

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
            />
          )}
          <DataGrid
            rows={homesData}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            disableSelectionOnClick
            autoHeight
          />
        </>
      )}
    </Box>
  );
};

export default HomeTable;
