import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useGetHomesQuery } from "../../../api/apiSlice";
import { Box, CircularProgress } from "@mui/material";
import AssignmentLink from "./AssignmentLink";

// Formats addresses
const getAddress = (params) => {
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
  const columns = [
    { field: "id", headerName: "Id", width: 50 },
    {
      field: "assignment_id",
      renderCell: (params) => (
        <AssignmentLink id={params.getValue(params.id, "assignment_id")} />
      ),
      headerName: "Assignment",
      width: 200,
    },
    {
      field: "address",
      valueGetter: getAddress,
      headerName: "Address",
      width: 200,
    },
    { field: "city", headerName: "City", width: 200 },
    { field: "zip_code", headerName: "Zip Code", width: 200 },
    { field: "completed", headerName: "Completed", width: 200 },
  ];

  const {
    data: homesData,
    error: homesError,
    isLoading: isHomesDataLoading,
  } = useGetHomesQuery();
  const navigate = useNavigate();

  const onRowClick = (row, event) => {
    console.log(event.target.parentElement.className);
    if (event.target.className.includes("goToAssignment")) {
      navigate(`/admin/assignments/${row.getValue(row.id, "assignment_id")}`);
    } else {
      navigate(`homeprofile/${row.id}`);
    }
  };

  if (isHomesDataLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (isHomesDataLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <DataGrid
      rows={homesData}
      columns={columns}
      pageSize={20}
      rowsPerPageOptions={[20]}
      disableSelectionOnClick
      autoHeight
      onRowClick={onRowClick}
    />
  );
};

export default HomeTable;
