import * as React from "react";

import CustomSnackbar from "../../../components/CustomSnackbar";
import Loader from "../../../components/Loader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useGetSurveyorsQuery } from "../../../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useGoToBreadcrumb } from "../../../hooks/useGoToBreadcrumb";
import { useDispatch } from "react-redux";
import { setBreadcrumbs } from "../../../features/breadcrumb/breadcrumbSlice";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";

const columns = [
  {field: "id", headerName: "User ID", flex: 1},
  {field: "firstname", headerName: "First Name", flex: 1 },
  {field: "lastname", headerName: "Last Name", flex: 1 },
  {field: "email", headerName: "Email", flex: 2 },
  {field: "phone", headerName: "Phone", flex: 1 },
  {field: "role", headerName: "Role", flex: 1 },
  {field: "status", headerName: "Status", flex: 1 },
];


const UserTable = () => {
  const dispatch = useDispatch();
  const goToBreadcrumb = useGoToBreadcrumb();

  dispatch(
    setBreadcrumbs([
      { url: "/admin/dashboard", description: "dashboard" },
      { url: "/admin/user", description: "users" },
    ])
  );

  const {
    data: rows,
    isError: isSurveyorsError,
    isLoading: isSurveyorsDataLoading,
  } = useGetSurveyorsQuery();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onRowClick = (row) => goToBreadcrumb("user", row);

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
            autoHeight
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
          {/* <TableContainer sx={{ maxHeight: 800 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`row-${row.id}`}
                      onClick={() => onRowClick(row)}
                      sx={{ cursor: "pointer" }}
                    >
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer> */}
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </>
      )}
    </Paper>
  );
};

export default UserTable;
