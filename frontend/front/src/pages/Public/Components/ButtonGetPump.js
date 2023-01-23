import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ButtonGetPumnp = ({ variant }) => {
  console.log(variant, "<====");
  return (
    <>
      {/* <Button component={Link} to="getstarted" variant="get-pump"> */}
      <Button component={Link} to="getstarted" variant={variant}>
        GET A HEAT PUMP
      </Button>
    </>
  );
};

export default ButtonGetPumnp;
