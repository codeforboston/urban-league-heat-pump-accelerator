import * as React from "react";

import RowData from "../../../dummyData/assignTable.json";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", maxWidth: 100, flex: 1 },
  {
    field: "assigned",
    headerName: "Assigned",
    width: 150,
    flex: 1,
  },
  { field: "homeCount", headerName: "Home", width: 110, flex: 1 },
  { field: "surveyed", headerName: "Status", width: 110, flex: 1 },
  { field: "completed", headerName: "Completed", width: 110, flex: 1 },
];

const rows = RowData;

const AssignTable = () => {
  const navigate = useNavigate();

  const handRowClick = (params, event) => {
    navigate(`assignProfile/${params.id}`);
  };

  return (
    <Box>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          disableSelectionOnClick
          autoHeight
          onRowClick={handRowClick}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default AssignTable;
