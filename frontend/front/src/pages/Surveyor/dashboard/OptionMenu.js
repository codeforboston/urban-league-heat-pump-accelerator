import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import { Close } from "@mui/icons-material";

const OptionMenu = (props) => {
  const { handleSelectAll, handleDeselectAll, handleSelectIncompleted } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const SelectAllAndClose = () => {
    handleSelectAll();
    handleClose();
  };

  const DeselectAllAndClose = () => {
    handleDeselectAll();
    handleClose();
  };

  const SelectIncompletedAndClose = () => {
    handleSelectIncompleted();
    handleClose();
  };

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
      >
        OPTIONS
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={SelectAllAndClose}>SELECT ALL</MenuItem>
        <MenuItem onClick={DeselectAllAndClose}>DESELECT ALL</MenuItem>
        <MenuItem onClick={SelectIncompletedAndClose}>
          SELECT INCOMPLETED
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default OptionMenu;
