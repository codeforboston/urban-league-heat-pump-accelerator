import { Typography } from "@mui/material";

function Heading3({ text }) {
  return (
    <Typography
      variant="h5"
      sx={{
        fontFamily: "var(--font-family-1)",
        color: "var(--color-text-2)",
        fontWeight: "600",
      }}
    >
      {text}
    </Typography>
  );
}

export default Heading3;
