import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/login/loginSlice";

const SurveyLink = ({ links, label = "VIEW", ...styles }) => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  // Dropdown for when there more then one servey
  const [dropdownButtonEl, setDropdownButtonEl] = useState(null);
  const openDropdown = (e) => setDropdownButtonEl(e.currentTarget);
  const closeDropdown = () => setDropdownButtonEl(null);

  const goToSurvey = (surveyId) => {
    currentUser.role === "admin"
      ? navigate(`/admin/survey/visit/${surveyId}`)
      : navigate(`/surveyor/survey/visit/${surveyId}`);
  };

  return (
    <>
      <Button
        {...styles}
        onClick={(e) => {
          if (links.length === 1) goToSurvey(links[0]);
          else openDropdown(e);
        }}
      >
        {label}
      </Button>
      {/* Dropdown */}
      <Menu
        anchorEl={dropdownButtonEl}
        open={!!dropdownButtonEl}
        onClose={closeDropdown}
      >
        {links.map((link, index) => (
          <MenuItem key={index} onClick={() => goToSurvey(link)}>
            Survey {index + 1}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SurveyLink;
