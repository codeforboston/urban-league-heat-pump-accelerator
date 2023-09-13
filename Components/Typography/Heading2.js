import { Typography } from "@mui/material";

function Heading2({ text, textDecoration = "none" }) {
  return (
    <Typography
      variant="h4"
      gutterBottom
      sx={{
        fontFamily: "var(--font-family-1)",
        color: "var(--color-text-2)",
        fontWeight: "600",
        textDecoration: textDecoration,
        textUnderlinePosition: "under",
        textDecorationColor: "var(--color-text-2)",
        textTransform: "capitalize",
      }}
    >
      {text}
    </Typography>
  );
}

export default Heading2;
