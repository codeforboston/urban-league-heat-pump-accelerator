import {
  Avatar,
  Box,
  Checkbox,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import DialogMenu from "./DialogMenu";
import { useNavigate } from "react-router-dom";

export const AssignmentHome = ({ home, handleToggle, checked }) => {
  const labelId = `checkbox-list-secondary-label-${home}`;
  const navigate = useNavigate();
  return (
    <ListItem
      key={home?.visit_order + home?.street_number}
      sx={{ pl: 0 }}
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={handleToggle(home)}
          checked={checked.indexOf(home) !== -1}
          inputProps={{ "aria-labelledby": labelId }}
        />
      }
    >
      <ListItemButton onClick={() => navigate("/surveyor/house/" + home?.id)}>
        <ListItemAvatar>
          <Avatar
            sx={{
              border: 1,
              fontSize: "1.5em",
              bgcolor: "white",
              color: "black",
            }}
          >
            {home?.visit_order}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          id={labelId}
          primary={
            <Box>
              <Box>{`${home?.street_number} ${home?.street_name}`}</Box>
              {home?.unit_number && <Box>{`Unit ${home?.unit_number}`}</Box>}
              <Box>{`${home?.city} ${
                home?.zip_code.length === 5
                  ? home?.zip_code
                  : `0${home?.zip_code}`
              }`}</Box>
              <Box>
                {home.completed === "true" ? (
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
        <DialogMenu value={home} />
      </Box>
    </ListItem>
  );
};
