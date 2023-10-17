import { Box, Typography, styled } from "@mui/material";

const TitleContainer = styled(Box)({
  textAlign: "center",
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
        {text} <br />
        <span
          style={{
            color: "var(--color-text-8)",
            textShadow: "1px 1px 1px var(--color-text-5)",
          }}
        >
          {titleBold}
        </span>
      </Typography>
    </TitleContainer>
  );
}

export default TitleHero;
