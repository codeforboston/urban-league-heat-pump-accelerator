import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import UserData from "../../../dummyData/assignTable.json";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const columns = [
  { id: "id", label: "AssignId", minWidth: 50 },
  { id: "assigned", label: "Assigned", minWidth: 50 },
  { id: "uid", label: "UserId", minWidth: 50 },
  { id: "completed", label: "Completed", minWidth: 50 },
];

const rows = UserData;

const AssignTable = () => {
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
    navigate(`assignProfile/${row.id}`);
  };

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
                    key={row.id}
                    onClick={() => onRowClick(row)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell align={row.align}>{row.id}</TableCell>
                    <TableCell align={row.align}>
                      {row.assigned ? (
                        row.assigned
                      ) : (
                        <Typography>NONE</Typography>
                      )}
                    </TableCell>
                    <TableCell align={row.align}>{row.uid}</TableCell>
                    <TableCell align={row.align}>
                      {row.completed === true ? "true" : "false"}
                    </TableCell>
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

export default AssignTable;
