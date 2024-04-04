import * as React from "react";

import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGetHomesQuery } from "../../../api/apiSlice";
import {
  useGoToBreadcrumb,
  useInitBreadcrumbs,
} from "../../../hooks/breadcrumbHooks";

import CustomSnackbar from "../../../components/CustomSnackbar";
import Loader from "../../../components/Loader";

import SurveyLink from "../../../components/SurveyLink";
import { ADMIN_HOME, withAdminPrefix } from "../../../routing/routes";

// Formats addresses
export const getAddress = (params) => {
  let adrs = params.row;

  return adrs.street_number + " " + adrs.street_name + " ";
};

const getApt = (params) => {
  return params.row.unit_number;
};

const HomeTable = () => {
  const goToBreadcrumb = useGoToBreadcrumb();

  useInitBreadcrumbs(
    [{ url: withAdminPrefix(ADMIN_HOME), description: "homes" }],
    true
  );

  const handleAssignmentLink = (assignment) =>
    goToBreadcrumb("assignment", assignment);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 50, flex: 0.7 },
    {
      field: "address",
      valueGetter: getAddress,
      headerName: "Address",
      minWidth: 200,
      flex: 1,
    },

    {
      field: "apartment",
      valueGetter: getApt,
      headerName: "Apt. No.",
      minWidth: 100,
      maxWidth: 200,
      flex: 0.5,
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
        params.row.completed ? (
          <SurveyLink
            label={"Yes ✅"}
            links={params.row.survey_visit_ids}
            variant="text"
            sx={{ minWidth: "unset", padding: "0px" }}
            color="primary"
            size="small"
          />
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
    isError: isHomesError,
    isLoading: isHomesDataLoading,
  } = useGetHomesQuery();

  if (isHomesDataLoading) {
    return <Loader />;
  }

  return (
    <Box>
      {isHomesError ? (
        <CustomSnackbar
          open={isHomesError}
          message="Error fetching homes data."
          severity="error"
        />
      ) : (
        <DataGrid
          rows={homesData}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnsMenu
          autoHeight
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      )}
    </Box>
  );
};

export default HomeTable;
