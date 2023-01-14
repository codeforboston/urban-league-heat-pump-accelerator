import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ButtonGetPumnp = () => {
  return (
    <>
      <Button component={Link} to="getstarted" variant="contained">
        GET A HEAT PUMP
      </Button>
    </>
  );
};

export default ButtonGetPumnp;
