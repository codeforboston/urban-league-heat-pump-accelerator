import { Box, Typography, styled } from "@mui/material";

const TitleContainer = styled(Box)({
  background: "var(--bgColor-1)",
  padding: "2em 0",
  textAlign: "center",
});

function Heading1BlueBgGround({ text }) {
  return (
    <TitleContainer mb={2}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: "var(--font-family-1)",
          display: "block",
          width: "100%",
          letterSpacing: "-.03em",
          textAlign: "center",
          fontWeight: "600",
          color: "var(--color-text-2)",
        }}
      >
        {text}
      </Typography>
    </TitleContainer>
  );
}

export default Heading1BlueBgGround;
