import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ButtonGetPumnp = ({ variant }) => {
  return (
    <>
      <Button component={Link} to="get-involved" variant={variant}>
        GET INVOLVED
      </Button>
    </>
  );
};

export default ButtonGetPumnp;
