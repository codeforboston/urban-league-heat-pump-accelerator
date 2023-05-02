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
  console.log(value);

  const OnBtnClick = (value) => {
    navigate("/surveyor/house/" + value);
  };
  return (
    <ListItemButton onClick={() => OnBtnClick(value.id)}>
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
  );
};

export default MapLinkUnit;
