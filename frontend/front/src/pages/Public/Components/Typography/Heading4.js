import { Typography } from "@mui/material";

function Heading4({ text }) {
  return (
    <Typography
      variant="h6"
      sx={{
        fontFamily: "var(--font-family-1)",
        color: "var(--color-text-2)",
      }}
    >
      {text}
    </Typography>
  );
}

export default Heading4;
