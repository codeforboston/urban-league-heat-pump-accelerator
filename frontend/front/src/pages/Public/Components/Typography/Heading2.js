import { Typography } from "@mui/material";

function capitalizeFirstLetterOnly(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

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
        textTransform: "initial",
      }}
    >
      {capitalizeFirstLetterOnly(text)}
    </Typography>
  );
}

export default Heading2;
