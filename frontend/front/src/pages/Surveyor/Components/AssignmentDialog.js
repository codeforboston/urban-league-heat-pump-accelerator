import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";

const AssignmentDialog = ({ home, onClose, open }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const title = `${home?.street_number} ${home?.street_name} ${
    home?.unit_number ? `Unit ${home?.unit_number}` : ""
  }`;

  return (
    <Dialog open={open} onClose={handleClose} scroll="paper">
      <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
      <List>
        {home.survey_visit_ids.map((id, index) => (
          <ListItem key={id}>
            <ListItemButton onClick={() => navigate(`/surveyor/survey/${id}`)}>
              <ListItemIcon>
                <EditNoteIcon />
              </ListItemIcon>
              <ListItemText primary={`Survey ${index + 1}`} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>
          <ListItemButton
            onClick={() => navigate(`/surveyor/house/${home.id}`)}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="New Survey" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
};

export default AssignmentDialog;
