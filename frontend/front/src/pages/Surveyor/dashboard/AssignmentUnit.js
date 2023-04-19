import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedHome } from "../../../features/surveyor/surveyorSlice";
import DialogMenu from "./DialogMenu";
import OptionMenu from "./OptionMenu";

const AssignmentUnit = (props) => {
  const { data } = props;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const OnclickFx = () => {
    navigate("/surveyor/map");
  };

  const OnBtnClick = (value) => {
    navigate("/surveyor/house/" + value);
  };

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
    console.log(checked);
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
    console.log();

    if (checked.length === 0) {
      setAlert(true);
      return console.log("No data selected");
    }

    const sortedCheck = [...checked].sort(compareArrayByOrder);

    // ensure all the home elements are sorted by their order before sending it to google map
    // const sortedCheck = checked.sort(compareArrayByOrder);
    dispatch(selectedHome(sortedCheck));
    OnclickFx();
  };

  const SelectAllIncompleted = () => {
    const IncompletedArray = [];
    data.forEach((item) => {
      if (item.completed === false) {
        IncompletedArray.push(item);
      }
    });

    setChecked(IncompletedArray);
  };

  const HandleSelectAll = () => {
    setChecked(data);
  };

  const HandleDeselectAll = () => {
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
          <Alert severity="error">
            Please Select One Home To Genereate Map
          </Alert>
        ) : null}
      </Box>
      <Box
        textAlign={"center"}
        display="flex"
        justifyContent={"center"}
        flexDirection="row"
      >
        <OptionMenu
          handleSelectAll={HandleSelectAll}
          handleDeselectAll={HandleDeselectAll}
          handleSelectIncompleted={SelectAllIncompleted}
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
        {data.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={value.visit_order + value.street_number}
              sx={{ pl: 0 }}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              }
            >
              <ListItemButton onClick={() => OnBtnClick(value.GIS_ID)}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      border: 1,
                      fontSize: "1.5em",
                      bgcolor: "white",
                      color: "black",
                    }}
                  >
                    {value.visit_order}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={
                    <Box>
                      <Box>{`${value.street_number} ${value.street_name}`}</Box>
                      <Box>{`${value.city} ${value.zip_code}`}</Box>
                      <Box>
                        {value.completed ? (
                          <Typography color="green">Completed</Typography>
                        ) : (
                          <Typography color="red">Incompleted</Typography>
                        )}
                      </Box>
                    </Box>
                  }
                />
              </ListItemButton>
              <Box pt={0.5} pl={1}>
                <DialogMenu value={value} />
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default AssignmentUnit;
