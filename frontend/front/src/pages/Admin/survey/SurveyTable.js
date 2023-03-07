import * as React from "react";

import { useNavigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetSurveyListQuery } from "../../../redux/apiSlice";
import { SurveyError } from "./SurveyError";

const columns = [
  { field: "id", headerName: "Id", maxWidth: 50 },
  {
    field: "firstName",
    headerName: "First Name",
    width: 200,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 200,
  },
  { field: "heatType", headerName: "Heat", width: 200 },
  { field: "nextStep", headerName: "Next Step", width: 200 },
  { field: "status", headerName: "Status", width: 200 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "city", headerName: "City", width: 200 },
  { field: "zipCode", headerName: "Zip Code", width: 200 },
];

const SurveyTable = () => {
  const navigate = useNavigate();

  const { data, error } = useGetSurveyListQuery();

  const onRowClick = (row) => {
    navigate(`${row.id}`);
  };

  if (data) {
    return (
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        disableSelectionOnClick
        autoHeight
        onRowClick={onRowClick}
      />
    );
  }

  if (error) {
    <SurveyError />;
  }

  return (
    <Box display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  );
};

export default SurveyTable;
