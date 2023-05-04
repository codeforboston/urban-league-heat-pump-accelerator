import { Box, Typography, styled } from "@mui/material";

const TitleContainer = styled(Box)({
  background: "var(--bgColor-1)",
  padding: "2em 0",
  textAlign: "center",
});

function Heading1({ text }) {
  return (
    <TitleContainer mb={2}>
      <Typography>{text}</Typography>
    </TitleContainer>
  );
}

export default Heading1;
