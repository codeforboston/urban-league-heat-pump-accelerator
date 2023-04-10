import { useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ButtonGetPumnp = ({ variant }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Button
        component={Link}
        to="get-heat-pump"
        variant={variant}
        onClick={() => window.scrollTo(0, 0)}
      >
        GET HEAT PUMP
      </Button>
    </>
  );
};

export default ButtonGetPumnp;
