import { Typography, Avatar, Stack } from "@mui/material";

function Heading3({ text, icon = null, textDecoration = "none" }) {
  return (
    <>
      {icon !== null ? (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar variant="square" src={icon} />
          <Typography
            variant="h5"
            sx={{
              fontFamily: "var(--font-family-1)",
              color: "var(--color-text-2)",
              fontWeight: "600",
              textDecoration: textDecoration,
              textUnderlinePosition: "under",
              textDecorationColor: "var(--color-text-2)",
            }}
          >
            {text}
          </Typography>
        </Stack>
      ) : (
        <Typography
          variant="h5"
          sx={{
            fontFamily: "var(--font-family-1)",
            color: "var(--color-text-2)",
            fontWeight: "600",
            textDecoration: textDecoration,
            textUnderlinePosition: "under",
            textDecorationColor: "var(--color-text-2)",
          }}
        >
          {text}
        </Typography>
      )}
    </>
  );
}

export default Heading3;
