import { useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ButtonDarkBklue = ({ text, to, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Button
        component={Link}
        to={to}
        onClick={() => window.scrollTo(0, 0)}
        sx={{
          width: "200px",
          height: "50px",
          color: "var(--color-text-1)",
          background: "var(--bgColor-2)",
          borderRadius: "1000px",
          "&:hover": {
            backgroundColor: "var(--bgColor-3)",
          },
        }}
      >
        {text ? text : children}
      </Button>
    </>
  );
};

export default ButtonDarkBklue;
