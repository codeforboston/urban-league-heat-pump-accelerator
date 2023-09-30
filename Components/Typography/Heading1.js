import { Typography } from "@mui/material";

function Heading1({ text, fontWeight = "600" }) {
  return (
    <Typography
      variant="h3"
      sx={{
        fontFamily: "var(--font-family-1)",
        color: "var(--color-text-2)",
        display: "block",
        width: "100%",
        fontWeight: { fontWeight },
      }}
    >
      {text}
    </Typography>
  );
}

export default Heading1;
