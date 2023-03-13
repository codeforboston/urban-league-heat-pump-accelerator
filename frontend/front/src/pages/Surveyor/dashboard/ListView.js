import { Box, Typography, Button, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";

import data from "../../../dummyData/homeDataCluster1.json";
import DialogMenu from "./DialogMenu";
import { useDispatch, useSelector } from "react-redux";
import { selectedHome } from "../../../features/surveyor/surveyorSlice";

const ListView = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const OnclickFx = () => {
    navigate("/surveyor/map");
  };

  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    console.log(currentIndex);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(checked);
  };
  // const selectedHomeValue = useSelector((state) => state.surveyor.selectedHome);
  // console.log(selectedHomeValue);
  const generateGoogleMap = () => {
    console.log("generateGoogleMap");
    console.log();
    dispatch(selectedHome(checked));
    OnclickFx();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-around" p={3}>
        <Button variant="contained" size="large" onClick={generateGoogleMap}>
          GENERATE MAPS
        </Button>
      </Box>
      <Box textAlign={"right"}>
        <Button
          variant="outlined"
          onClick={() => setChecked(data)}
          size="small"
          sx={{ mr: 2 }}
        >
          Select All
        </Button>
        <Button variant="outlined" onClick={() => setChecked([])} size="small">
          Deselect All
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
