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
import {
  useGoToBreadcrumb,
  useInitBreadcrumbs,
} from "../../../hooks/breadcrumbHooks";
import { ADMIN_USER, withAdminPrefix } from "../../../routing/routes";

const columns = [
  { id: "id", label: "UserID", minWidth: 50 },
  { id: "firstname", label: "First Name", minWidth: 50 },
  { id: "lastname", label: "Last Name", minWidth: 50 },
  { id: "email", label: "Email", minWidth: 50 },
  { id: "phone", label: "Phone", minWidth: 50 },
  { id: "role", label: "Role", minWidth: 50 },
  { id: "status", label: "Status", minWidth: 50 },
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
          <TableContainer sx={{ maxHeight: 800 }}>
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
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
};

export default UserTable;
