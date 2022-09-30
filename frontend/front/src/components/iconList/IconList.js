import { ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import React from "react";

const IconList = (props) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar></Avatar>
      </ListItemAvatar>
      <ListItemText primary={props.heading} secondary={props.description} />
    </ListItem>
  );
};

export default IconList;
