import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as React from "react";
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
  { field: "id", headerName: "User ID", minWidth: 50, flex: 0.7 },
  { field: "firstname", headerName: "First Name", minWidth: 100, flex: 1 },
  { field: "lastname", headerName: "Last Name", minWidth: 100, flex: 1 },
  { field: "email", headerName: "Email", minWidth: 200, flex: 1.5 },
  { field: "phone", headerName: "Phone", minWidth: 120, flex: 1.2 },
  { field: "role", headerName: "Role", minWidth: 100, flex: 1 },
  { field: "status", headerName: "Status", minWidth: 90, flex: 0.8 },
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
