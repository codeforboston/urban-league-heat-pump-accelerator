import { Box, Button, Typography } from "@mui/material";

import ContainerTitle from "../component/ContainerTitle";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  useGetAssignmentQuery,
  useGetSurveyorsQuery,
} from "../../../api/apiSlice";
import Loader from "../../../components/Loader";
import CustomSnackbar from "../../../components/CustomSnackbar";
import { getAddress } from "../home/HomeTable";

const AssignProfile = () => {
  const { aid } = useParams();
  const navigate = useNavigate();

  const {
    data: assignmentData,
    isError: isAssignmentError,
    isLoading: isAssignmentDataLoading,
  } = useGetAssignmentQuery(aid);

  const {
    data: surveyorsData,
    isError: isSurveyorsError,
    isLoading: isSurveyorsDataLoading,
  } = useGetSurveyorsQuery();

  const surveyors = surveyorsData
    ? surveyorsData.filter((surveyor) =>
        assignmentData?.surveyor_ids.includes(surveyor.id)
      )
    : "Unassigned";

  const columns = [
    { field: "id", headerName: "HomeId", maxWidth: 100, flex: 1 },
    { field: "visit_order", headerName: "Visit order", maxWidth: 100, flex: 1 },
    {
      field: "address",
      valueGetter: getAddress,
      headerName: "Address",
      minWidth: 200,
      maxWidth: 300,
      flex: 1.5,
    },
    {
      field: "zip_code",
      headerName: "Zipcode",
      maxWidth: 100,
    },
    {
      field: "city",
      headerName: "City",
      maxWidth: 200,
      minWidth: 100,
      flex: 0.8,
    },
    {
      field: "completed",
      headerName: "Completed",
      renderCell: (params) => (params.row?.completed ? "Yes" : "No"),
      minWidth: 50,
      maxWidth: 100,
    },
    {
      field: "survey",
      headerName: "Survey",
      minWidth: 50,
      maxWidth: 80,
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
      minWidth: 50,
      maxWidth: 80,
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
      headerName: "Unassign",
      minWidth: 50,
      maxWidth: 80,
      renderCell: (params) => (
        <Button
          variant="text"
          color="error"
          size="small"
          onClick={() =>
            console.log(`clicked unassign home id: ${params.row.id}`)
          }
        >
          X
        </Button>
      ),
    },
  ];

  return (
    <ContainerTitle>
      {isAssignmentDataLoading || isSurveyorsDataLoading ? (
        <Loader />
      ) : isAssignmentError ? (
        <CustomSnackbar
          open={isAssignmentError}
          message="Error fetching surveyor assignment data"
          severity="error"
        />
      ) : isSurveyorsError ? (
        <CustomSnackbar
          open={isSurveyorsError}
          message="Error fetching surveyors data"
          severity="error"
        />
      ) : (
        <>
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
              Assigned Surveyor(s):
            </Typography>
            {surveyors.map((surveyor) => (
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  navigate(`/admin/user/userprofile/${surveyor.id}`)
                }
              >
                {`${surveyor.lastname}, ${surveyor.firstname}`}
              </Button>
            ))}
          </Box>
          <div style={{ width: "100%" }}>
            <DataGrid
              rows={assignmentData.homes}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20]}
              autoHeight
            />
          </div>
        </>
      )}
    </ContainerTitle>
  );
};

export default AssignProfile;
