import { Box, Typography, Button, ListItemText, Alert } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";

import data from "../../../dummyData/homeDataCluster1.json";
import DialogMenu from "./DialogMenu";
import { useDispatch } from "react-redux";
import { selectedHome } from "../../../features/surveyor/surveyorSlice";

const ListView = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const OnclickFx = () => {
    navigate("/surveyor/map");
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
    if (a.ORDER < b.ORDER) {
      return -1;
    }
    if (a.ORDER > b.ORDER) {
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

  //
  const SelectAllIncompleted = () => {
    const IncompletedArray = [];
    data.forEach((item) => {
      if (item.completed === false) {
        IncompletedArray.push(item);
      }
    });

    setChecked(IncompletedArray);
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
        <Button
          variant="outlined"
          onClick={() => setChecked(data)}
          size="small"
        >
          Select All
        </Button>
        <Button variant="outlined" onClick={() => setChecked([])} size="small">
          Deselect All
        </Button>

        <Button variant="outlined" onClick={SelectAllIncompleted} size="small">
          Select Incompleted
        </Button>
      </Box>

      <Box textAlign={"center"} pt={3}>
        <Typography variant="h4">Assignment #1</Typography>
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
              key={value.ORDER + value.ST_NUM}
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
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      border: 1,
                      fontSize: "1.5em",
                      bgcolor: "white",
                      color: "black",
                    }}
                  >
                    {value.ORDER}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={
                    <Box>
                      <Box>{`${value.ST_NUM} ${value.ST_NAME}`}</Box>
                      <Box>{`${value.CITY} ${value.ZIPCODE}`}</Box>
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

export default ListView;
