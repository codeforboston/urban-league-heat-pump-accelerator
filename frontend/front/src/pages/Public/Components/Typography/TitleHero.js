import { Box, Typography, styled } from "@mui/material";

const TitleContainer = styled(Box)({
  textAlign: "center",
});

const TitleSpan = styled("div")({
  color: "var(--color-text-8)",
  textShadow: "1px 1px 1px var(--color-text-5)",
});

function TitleHero({ text, titleBold }) {
  return (
    <TitleContainer mb={2}>
      <Typography
        variant="h2"
        sx={{
          color: "var(--color-text-9)",
          display: "block",
          fontWeight: 600,
          textShadow: "1px 1px 1px var(--color-text-5)",
        }}
      >
        {text} <TitleSpan>{titleBold}</TitleSpan>
      </Typography>
    </TitleContainer>
  );
}

export default TitleHero;
