import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const MapLinkUnit = ({ value }) => {
  const navigate = useNavigate();

  const OnBtnClick = (value) => {
    navigate("/surveyor/house/" + value);
  };
  return (
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
          {value.ORDER}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box>
            <Box>{`${value.ST_NUM} ${value.ST_NAME}`}</Box>
            <Box>{`${value.CITY} ${value.ZIPCODE}`}</Box>
            <Box>
              {value.completed ? (
                <Typography color="green">Completed</Typography>
              ) : (
                <Typography color="red">Incomplete</Typography>
              )}
            </Box>
          </Box>
        }
      />
    </ListItemButton>
  );
};

export default MapLinkUnit;
