import { useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ButtonWhite = ({ text, to, children }) => {
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
          px: 2,
          width: "auto",
          minWidth: "200px",
          maxWidth: "250px",
          height: "50px",
          color: "var(--color-text-2)",
          background: "var(--bgColor-3)",
          borderRadius: "50px",
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

export default ButtonWhite;
