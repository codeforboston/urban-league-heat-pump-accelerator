import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ButtonGetPumnp = () => {
  return (
    <>
      <Button component={Link} to="getstarted" variant="get-pump">
        GET A HEAT PUMP
      </Button>
    </>
  );
};

export default ButtonGetPumnp;
