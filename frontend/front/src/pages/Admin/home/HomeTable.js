import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "Id", width: 50 },
  { field: "surveyor", headerName: "Surveyor", width: 200 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "city", headerName: "City", width: 200 },
  { field: "zipcode", headerName: "Zip Code", width: 200 },
  { field: "completed", headerName: "Completed", width: 200 },
];

const rows = [];

const HomeTable = () => {
  const navigate = useNavigate();

  const onRowClick = (row) => {
    navigate(`homeprofile/${row.id}`);
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

export default HomeTable;
