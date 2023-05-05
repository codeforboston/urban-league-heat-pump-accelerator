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
        variant="Button"
        onClick={() => window.scrollTo(0, 0)}
        sx={{
          color: "var(--color-text-2)",
          background: "var(--bgColor-1)",
          fontSize: "1rem",
          height: "50px",
          fontWeight: "var(--font-weight-1)",
          borderRadius: "1000px",
          minWidth: 200,
          transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
          letterSpacing: "-.03em",
          "&:hover": {
            background: "var(--accent-2)",
          },
        }}
      >
        GET A HEAT PUMP
      </Button>
    </>
  );
};

export default ButtonGetPumnp;
