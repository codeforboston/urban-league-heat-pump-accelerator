import { Box, Typography, styled } from "@mui/material";

const TitleContainer = styled(Box)({
  background: "var(--bgColor-1)",
  padding: "2em 0",
  textAlign: "center",
  textShadow: "1px 1px 1px var(--color-text-5)",
});

function Heading1BlueBgGround({ text, children }) {
  return (
    <TitleContainer mb={5}>
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
          textShadow: "1px 1px 1px var(--color-text-5)",
          textTransform: "capitalize",
        }}
      >
        {text}
      </Typography>
      {children}
    </TitleContainer>
  );
}

export default Heading1BlueBgGround;
