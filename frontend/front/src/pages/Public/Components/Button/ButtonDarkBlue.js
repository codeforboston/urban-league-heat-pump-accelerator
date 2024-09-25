import { useEffect, forwardRef } from "react";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ButtonDarkBklue = ({ text, to, children, externalLink }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const LinkBehavior = forwardRef((props, ref) => (
    <RouterLink ref={ref} to={to} {...props} />
  ));

  if (externalLink) {
    return (
      <>
        <Button
          component={LinkBehavior}
          target={externalLink ? "_blank" : "_self"}
          onClick={externalLink ? undefined : () => window.scrollTo(0, 0)}
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
  }

  return (
    <>
      <Button
        component={RouterLink}
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
