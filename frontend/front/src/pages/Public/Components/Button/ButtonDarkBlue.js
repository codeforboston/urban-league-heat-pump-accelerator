import { useEffect } from "react";
import { Button, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

const ButtonDarkBklue = ({ text, to, children, externalLink }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (externalLink) {
    return (
      <MuiLink href={to} target="_blank" rel="noopener noreferrer">
        <Button
          onClick={() => window.scrollTo(0, 0)}
          sx={{
            px: 2,
            width: "auto",
            minWidth: "200px",
            height: "50px",
            color: "var(--color-text-1)",
            background: "var(--bgColor-2)",
            borderRadius: "50px",
            textAlign: "center",
            "&:hover": {
              backgroundColor: "var(--bgColor-2)",
            },
          }}
        >
          {text ? text : children}
        </Button>
      </MuiLink>
    );
  }

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
          height: "50px",
          color: "var(--color-text-1)",
          background: "var(--bgColor-2)",
          borderRadius: "50px",
          textAlign: "center",
          "&:hover": {
            backgroundColor: "var(--bgColor-2)",
          },
        }}
      >
        {text ? text : children}
      </Button>
    </>
  );
};

export default ButtonDarkBklue;
