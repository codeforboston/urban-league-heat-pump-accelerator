import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useGetHomesQuery } from "../../../api/apiSlice";
import { Box, Button } from "@mui/material";
import Loader from "../../../components/Loader";
import CustomSnackbar from "../../../components/CustomSnackbar";

// Formats addresses
export const getAddress = (params) => {
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
    { field: "id", headerName: "Id", minWidth: 80 },
    {
      field: "address",
      valueGetter: getAddress,
      headerName: "Address",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 100,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "zip_code",
      headerName: "Zip Code",
      minWidth: 100,
      maxWidth: 100,
      flex: 0.8,
    },
    {
      field: "completed",
      headerName: "Completed",
      renderCell: (params) => (params.row.completed === "true" ? "Yes" : "No"),
      minWidth: 100,
      maxWidth: 150,
      flex: 0.8,
    },
    {
      field: "assignment_id",
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() =>
            navigate(
              `/admin/assignment/assignProfile/${params.row.assignment_id}`
            )
          }
        >
          {params.row.assignment_id}
        </Button>
      ),
      headerName: "Assignment",
      width: 110,
    },
    {
      field: "home",
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() => navigate(`homeprofile/${params.row.id}`)}
        >
          View
        </Button>
      ),
      headerName: "Home",
      maxWidth: 80,
    },
  ];

  const {
    data: homesData,
    isError: isHomesError,
    isLoading: isHomesDataLoading,
  } = useGetHomesQuery();
  const navigate = useNavigate();

  if (isHomesDataLoading) {
    return <Loader />;
  }

  return (
    <Box>
      {isHomesError ? (
        <CustomSnackbar
          open={isHomesError}
          message="Error fetching homes data."
          severity="error"
        />
      ) : (
        <DataGrid
          rows={homesData}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          disableSelectionOnClick
          autoHeight
        />
      )}
    </Box>
  );
};

export default HomeTable;
