import * as React from "react";

import Survey from "../../../dummyData/Survey.json";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "Id", maxWidth: 50 },
  {
    field: "firstName",
    headerName: "First Name",
    width: 200
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 200
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 200
  },
  { field: "heatType", headerName: "Heat", width: 200 },
  { field: "nextStep", headerName: "Next Step", width: 200 },
  { field: "status", headerName: "Status", width: 200 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "city", headerName: "City", width: 200 },
  { field: "zipCode", headerName: "Zip Code", width: 200 },
];

const rows = Survey;

const SurveyTable = () => {
  const navigate = useNavigate();

  const onRowClick = (row) => {
    navigate(`surveyprofile/${row.id}`);
  };

  return (
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        disableSelectionOnClick
        autoHeight
        onRowClick={onRowClick}
      />

  );
};

export default SurveyTable;
