import { Box, Typography, styled } from "@mui/material";

const TitleContainer = styled(Box)({
  textAlign: "center",
});

function TitleHero({
  text,
  fontWeight = "500",
  color = "var(--color-text-9)",
}) {
  return (
    <TitleContainer mb={2}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "var(--font-family-1)",
          color: { color },
          // fontSize: "3rem",
          display: "block",
          fontWeight: { fontWeight },
          // lineHeight: "60px",
          // letterSpacing: ".02rem",
        }}
      >
        {text}
      </Typography>
    </TitleContainer>
  );
}

export default TitleHero;
