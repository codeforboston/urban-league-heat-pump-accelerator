import { Typography } from "@mui/material";

function Heading1({ text }) {
  return (
    <Typography
      variant="h3"
      sx={{
        fontFamily: "var(--font-family-1)",
        color: "var(--color-text-2)",
        display: "block",
        width: "100%",
        letterSpacing: "-.03em",
        fontWeight: "600",
      }}
    >
      {text}
    </Typography>
  );
}

export default Heading1;
