import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as React from "react";
import { useGetSurveyorsQuery } from "../../../api/apiSlice";
import CustomSnackbar from "../../../components/CustomSnackbar";
import Loader from "../../../components/Loader";
import Paper from "@mui/material/Paper";
import { useGetSurveyorsQuery } from "../../../api/apiSlice";
import {
  useGoToBreadcrumb,
  useInitBreadcrumbs,
} from "../../../hooks/breadcrumbHooks";
import { ADMIN_USER, withAdminPrefix } from "../../../routing/routes";


const columns = [
  { field: "id", headerName: "User ID", flex: 0.7 },
  { field: "firstname", headerName: "First Name", flex: 1 },
  { field: "lastname", headerName: "Last Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 2 },
  { field: "phone", headerName: "Phone", flex: 1 },
  { field: "role", headerName: "Role", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
];

const UserTable = () => {
  const goToBreadcrumb = useGoToBreadcrumb();

  useInitBreadcrumbs(
    [{ url: withAdminPrefix(ADMIN_USER), description: "users" }],
    true
  );

  const {
    data: rows,
    isError: isSurveyorsError,
    isLoading: isSurveyorsDataLoading,
  } = useGetSurveyorsQuery();

  const onRowClick = (data) => goToBreadcrumb("user", data.row);

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
            onRowClick={onRowClick}
            disableColumnFilter
            disableDensitySelector
            disableColumnsMenu
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </>
      )}
    </Paper>
  );
};

export default UserTable;
