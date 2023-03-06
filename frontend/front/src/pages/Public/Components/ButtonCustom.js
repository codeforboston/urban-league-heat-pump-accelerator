import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ButtonCustom = ({ variant, text, to }) => {
  return (
    <>
      <Button component={Link} to={to} variant={variant}>
        {text}
      </Button>
    </>
  );
};

export default ButtonCustom;
