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

import { useNavigate } from "react-router-dom";
import SurveyLink from "../../../components/SurveyLink";

const CompleteButton = ({ home }) => {
  if (!home.completed) {
    return (
      <Typography color="red" sx={{ display: "inline-flex" }}>
        Incomplete
      </Typography>
    );
  }

  let text = "Complete";
  if (home.survey_visit_ids > 1) {
    text += ` (${home.survey_visit_ids})`;
  }

  return (
    <SurveyLink
      mode="surveyor"
      label={<Typography color="green">{text}</Typography>}
      links={home.survey_visit_ids}
      variant="text"
      size="small"
      color="primary"
    />
  );
};

export const AssignmentHome = ({
  home,
  handleToggle,
  checked,
  selectionCap,
}) => {
  const labelId = `checkbox-list-secondary-label-${home}`;
  const navigate = useNavigate();

  return (
    <ListItem
      key={home?.visit_order + home?.street_number}
      sx={{ pl: 0 }}
      secondaryAction={
        <>
          {<CompleteButton home={home} />}
          <Checkbox
            edge="end"
            onChange={handleToggle(home)}
            checked={checked}
            inputProps={{ "aria-labelledby": labelId }}
            disabled={selectionCap && !checked}
          />
        </>
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
            </Box>
          }
        />
      </ListItemButton>
      {/* <Box pt={0.5} pl={1}>
        <DialogMenu value={home} />
      </Box> */}
    </ListItem>
  );
};
