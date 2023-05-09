import { Box, Typography, styled } from "@mui/material";

const TitleContainer = styled(Box)({
  textAlign: "center",
});

const TitleSpan = styled("span")({
  color: "var(--color-text-8)",
});

function TitleHero({ text, titleBold }) {
  return (
    <TitleContainer mb={2}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "var(--font-family-1)",
          color: "var(--color-text-9)",
          display: "block",
          fontWeight: 600,
        }}
      >
        {text} <TitleSpan>{titleBold}</TitleSpan>
      </Typography>
    </TitleContainer>
  );
}

export default TitleHero;
