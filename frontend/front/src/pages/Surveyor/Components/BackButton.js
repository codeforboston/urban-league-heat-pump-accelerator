import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
export const BackButton = ({ url, description }) => {
  return (
    <Button
      component={Link}
      to={url}
      sx={{ mt: "10px", ml: "-12px", gap: "5px", justifyContent: "center" }}
    >
      <ArrowBack />
      Return to {description}
    </Button>
  );
};
