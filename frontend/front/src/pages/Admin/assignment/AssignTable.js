import * as React from "react";

import { Box, Button, MenuItem } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { useGetAssignmentsQuery, useGetSurveyorsQuery } from "../../../api/apiSlice";
import Loader from "../../../components/Loader";
import CustomSnackbar from "../../../components/CustomSnackbar";


const userData = [];

const AssignTable = () => {
  const navigate = useNavigate();
  const [surveyor, setSurveyor] = React.useState("");

  const handleChange = (event) => {
    setSurveyor(event.target.value);
  };

  const [selectionModel, setSelectionModel] = React.useState([]);

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
    console.log("Selected IDs:", newSelection);
  };

  const handleAddSurveyor = () => {
    console.log(
      `add ${surveyor} to this selected assignment id`,
      selectionModel
    );
  };
  const handleRemoveSurveyor = () => {
    console.log(
      `remove ${surveyor} from this selected assignment id`,
      selectionModel
    );
  };
  const handleNameClick = (item) => {
    return navigate(`/admin/user/userprofile/${item}`);
  };

  const {
    data: assignmentsData,
    isError: isAssignmentsError,
    isLoading: isAssignmentsDataLoading,
  } = useGetAssignmentsQuery();

  const {
    data: surveyorsData,
    isError: isSurveyorsError,
    isLoading: isSurveyorsDataLoading,
  } = useGetSurveyorsQuery();

  const columns = [
    { field: "id", headerName: "Id", maxWidth: 100, flex: 1 },
    {
      field: "surveyor_ids",
      headerName: "Surveyors",
      width: 150,
      flex: 1,
      renderCell: (params) => {
        return params.row.surveyor_ids ? (
          params.row.surveyor_ids.map((id) => {
            const surveyor = surveyorsData.find(
              (surveyor) => {
                return surveyor.id === id
              }
            )
            console.log(surveyor.firstname)
          return <Button key={`surveyor-${id}`} onClick={() => handleNameClick(params.row.surveyor_ids)}>
            {`${surveyor.lastname}, ${surveyor.firstname}`}
          </Button>
          })
        ) : (
          "Unassigned"
        );
      },
    },
    // { field: "home", headerName: "Home", width: 110, flex: 1 },
    // { field: "surveyed", headerName: "Surveyed", width: 110, flex: 1 },
    { field: "completed", headerName: "Completed", width: 110, flex: 1 },
    {
      field: "assignment",
      headerName: "Assignment",
      width: 110,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() => navigate(`assignProfile/${params.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

if (isAssignmentsDataLoading || isSurveyorsDataLoading) {
  return <Loader/>
}

  return (
    <Box>
      {(isAssignmentsDataLoading || isSurveyorsDataLoading) ? (
        <Loader/>
      ) : (isAssignmentsError) ? (
        <CustomSnackbar
          open={isAssignmentsError}
          message="Error fetching surveyor assignment data"
          severity="error"
        />
      ) : ( isSurveyorsError) ? (
        <CustomSnackbar
          open={ isSurveyorsError}
          message="Error fetching surveyor user data"
          severity="error"
        />
      ) : (
      <><Box py={3} flexDirection="row" display="flex">
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Surveyor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={surveyor}
              label="Surveyor"
              onChange={handleChange}
            >
              {userData.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.firstName + " " + item.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button
          size="large"
          sx={{ mb: 2.5, px: 3, py: 1.5, mx: 4 }}
          variant="outlined"
          onClick={handleAddSurveyor}
        >
          Add
        </Button>
        <Button
          size="large"
          sx={{ mb: 2.5, px: 3, py: 1.5, mx: 1 }}
          variant="outlined"
          onClick={handleRemoveSurveyor}
        >
          Remove
        </Button>
      </Box>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={assignmentsData}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          disableSelectionOnClick
          autoHeight
          checkboxSelection
          onSelectionModelChange={handleSelectionModelChange}
          selectionModel={selectionModel}
        />
      </Box></>)}
    </Box>
  );
};

export default AssignTable;
