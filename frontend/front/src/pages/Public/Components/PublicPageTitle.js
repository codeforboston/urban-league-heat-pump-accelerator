import { Box, Typography, styled } from "@mui/material";

const TitleContainer = styled(Box)({
  background: "var(--bgColor-1)",
  padding: "2em 0",
  textAlign: "center",
});

function PublicPageTile({ pageTitle }) {
  return (
    <TitleContainer mb={2}>
      <Typography variant="h3">{pageTitle}</Typography>
    </TitleContainer>
  );
}

export default PublicPageTile;
