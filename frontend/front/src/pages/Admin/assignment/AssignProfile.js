import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import AssignProfileTable from "../../../dummyData/assignProfileTable.json";
import ContainerTitle from "../component/ContainerTitle";

const rows = AssignProfileTable;

const AssignProfile = () => {
  const { aid } = useParams();
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "HomeId", maxWidth: 100, flex: 1 },
    { field: "order", headerName: "Order", maxWidth: 100, flex: 1 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "zipcode", headerName: "Zipcode", width: 120 },
    {
      field: "city",
      headerName: "City",
      width: 200,
      flex: 1,
    },
    { field: "completed", headerName: "Completed", width: 200, flex: 1 },
    {
      field: "survey",
      headerName: "Survey",
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() =>
            navigate(`/admin/survey/surveyprofile/${params.row.surveyId}`)
          }
        >
          View
        </Button>
      ),
    },
    {
      field: "hid",
      headerName: "Home",
      width: 150,
      flex: 1,

      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() => navigate(`/admin/home/homeprofile/${params.row.id}`)}
        >
          View
        </Button>
      ),
    },
    {
      field: "unassign",
      headerName: "unassign",
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="text"
          color="error"
          size="small"
          onClick={() => console.log("clicked unassign")}
        >
          X
        </Button>
      ),
    },
  ];

  return (
    <ContainerTitle>
      <Box textAlign="center" m={5}>
        <Typography variant="h3">Assignment Id: {aid}</Typography>
      </Box>
      <Box
        py={3}
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography variant="h5" sx={{ mr: 3 }}>
          Assign Surveyor:
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(`/admin/user/userprofile/1`)}
        >
          JohnSmith
        </Button>
      </Box>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          autoHeight
        />
      </div>
    </ContainerTitle>
  );
};

export default AssignProfile;
