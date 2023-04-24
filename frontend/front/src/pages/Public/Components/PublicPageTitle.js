import { Box, Typography, styled } from "@mui/material";
const TitleContainer = styled(Box)({
  height: "102px",
  backgroundColor: "var(--bgColor-14)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "3.875",
  },
  fontWeight: 500,
  color: "var(--bgColor-2)",
  fontFamily: "var(--font-family-1)",
}));
function PublicPageTile({ pageTitle }) {
  return (
    <TitleContainer>
      <StyledTitle variant="h2">{pageTitle}</StyledTitle>
    </TitleContainer>
  );
}

export default PublicPageTile;
