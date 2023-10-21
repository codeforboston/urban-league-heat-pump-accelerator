import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ButtonGetPumnp = () => {
  const { t } = useTranslation();

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
          px: 2,
          color: "var(--color-text-2)",
          background: "var(--bgColor-1)",
          height: "50px",
          fontWeight: 600,
          borderRadius: "50px",
          width: "auto",
          minWidth: 200,
          transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
          letterSpacing: "-.03em",
          "&:hover": {
            background: "var(--bgColor-1)",
          },
        }}
      >
        {t("public.global-labels.button-get-heat-pump")}
      </Button>
    </>
  );
};

export default ButtonGetPumnp;
