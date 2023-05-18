import * as React from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { useGetSurveyorsQuery } from "../../../api/apiSlice";
import { Box, CircularProgress } from "@mui/material";
import Loader from "../../../components/Loader";

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
  const {
    data: rows,
    error: surveyorsError,
    isLoading: isSurveyorsDataLoading,
  } = useGetSurveyorsQuery();
  console.log(rows);
  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onRowClick = (row) => {
    navigate(`userprofile/${row.id}`);
  };

  if (isSurveyorsDataLoading) {
    return <Loader />;
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.phone + row.name}
                    onClick={() => onRowClick(row)}
                    sx={{ cursor: "pointer" }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
    </Paper>
  );
};

export default UserTable;
