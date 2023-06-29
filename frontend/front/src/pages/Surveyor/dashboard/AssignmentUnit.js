import { Alert, Box, Button, List } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedHome } from "../../../features/surveyor/surveyorSlice";
import OptionMenu from "./OptionMenu";
import { AssignmentHome } from "./AssignmentHome";

const AssignmentUnit = ({ data }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [checked, setChecked] = useState([]);

  const [alert, setAlert] = useState(false);

  const handleToggle = (value) => () => {
    // get the index of the current value in checked array
    const currentIndex = checked.indexOf(value);
    // copy checked array into a newChecked variable
    const newChecked = [...checked];

    // toggle remove or add index into the array
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // does a quick comparison by order
  const compareArrayByOrder = (a, b) => {
    if (a.visit_order < b.visit_order) {
      return -1;
    }
    if (a.visit_order > b.visit_order) {
      return 1;
    }
    return 0;
  };

  const generateGoogleMap = () => {
    console.log("generateGoogleMap");

    if (checked.length === 0) {
      setAlert(true);
      return console.log("No data selected");
    }

    const sortedCheck = [...checked].sort(compareArrayByOrder);

    // ensure all the home elements are sorted by their order before sending it to google map
    // const sortedCheck = checked.sort(compareArrayByOrder);
    dispatch(selectedHome(sortedCheck));
    navigate("/surveyor/map");
  };

  const incompletedList = [];
  
  const selectAllIncompleted = () => {
    setChecked(incompletedList);
  };

  const handleSelectAll = () => {
    setChecked(data);
  };

  const handleDeselectAll = () => {
    setChecked([]);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-around" p={3}>
        <Button variant="contained" size="large" onClick={generateGoogleMap}>
          GENERATE MAPS
        </Button>
      </Box>
      <Box pb={3}>
        {alert ? (
          <Alert severity="error">Please Select One Home To Generate Map</Alert>
        ) : null}
      </Box>
      <Box
        textAlign={"center"}
        display="flex"
        justifyContent={"center"}
        flexDirection="row"
      >
        <OptionMenu
          handleSelectAll={handleSelectAll}
          handleDeselectAll={handleDeselectAll}
          handleSelectIncompleted={selectAllIncompleted}
        />
      </Box>
      <List
        dense
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {data &&
          data.map((home) => {
            home.completed !== "true" && incompletedList.push(home);
            return (
              <AssignmentHome
                key={`assignmentHome-${home.id}`}
                home={home}
                handleToggle={handleToggle}
                checked={checked}
              />
            );
          })}
      </List>
    </Box>
  );
};

export default AssignmentUnit;
