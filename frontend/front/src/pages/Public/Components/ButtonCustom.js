import { useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ButtonCustom = ({ variant, text, to }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Button
        component={Link}
        to={to}
        variant={variant}
        onClick={() => window.scrollTo(0, 0)}
      >
        {text}
      </Button>
    </>
  );
};

export default ButtonCustom;
