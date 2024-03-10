import * as React from "react";

import { Box, Button } from "@mui/material";
import CustomSnackbar from "../../../components/CustomSnackbar";
import Loader from "../../../components/Loader";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { useGetSurveyorsQuery } from "../../../api/apiSlice";
import {
  useGoToBreadcrumb,
  useInitBreadcrumbs,
} from "../../../hooks/breadcrumbHooks";
import { ADMIN_USER, withAdminPrefix } from "../../../routing/routes";


const UserTable = () => {
  const goToBreadcrumb = useGoToBreadcrumb();

const handleRowClick = (row) => {
  goToBreadcrumb("user", row)
}

const columns = [
  { field: "id",        headerName: "UserID",     minWidth: 60 },
  { field: "firstname", headerName: "First Name", minWidth: 60 },
  { field: "lastname",  headerName: "Last Name",  minWidth: 60 },

  { field: "email",     
    headerName: "Email",      
    minWidth: 200,
    renderCell: (params) => (
      <Box minWidth="max-content" m={0}>
        <Button
          onClick={() => handleRowClick(params.row)}
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
  { field: "phone",     headerName: "Phone",      minWidth: 120 },
  { field: "role",      headerName: "Role",       minWidth: 60 },
  { field: "status",    headerName: "Status",     minWidth: 60 },
];

  useInitBreadcrumbs(
    [{ url: withAdminPrefix(ADMIN_USER), description: "users" }],
    true
  );

  const {
    data: rows,
    isError: isSurveyorsError,
    isLoading: isSurveyorsDataLoading,
  } = useGetSurveyorsQuery();


  if (isSurveyorsDataLoading) {
    return <Loader />;
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {isSurveyorsError ? (
        <CustomSnackbar
          open={isSurveyorsError}
          message="Error fetching Surveyors data."
          severity="error"
        />
      ) : (
        <>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            disableSelectionOnClick
            autoHeight
            onRowclick={handleRowClick}

          />
        </>
      )}
    </Paper>
  );
};

export default UserTable;
