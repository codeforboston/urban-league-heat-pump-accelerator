import { useEffect } from "react";
import { Stack, IconButton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function ScrollToTopButton() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Stack>
      <IconButton
        color="primary"
        aria-label="backTotheTop"
        onClick={() => window.scrollTo(0, 0)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "1000",
        }}
      >
        <ArrowForwardIosIcon sx={{ transform: "rotate(-90deg)" }} />

        <Typography variant="navLinks">Top</Typography>
      </IconButton>
    </Stack>
  );
}

export default ScrollToTopButton;
