import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledSectionNumber = styled(Typography)(({ theme }) => ({
  fontFamily: "Lora",
  fontWeight: 700,
  color: "var(--bgColor-2)",
  [theme.breakpoints.up("xs")]: {
    fontSize: "4rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "9.375rem",
  },
}));
function SectionNumber({ number }) {
  return <StyledSectionNumber variant="h2">{number}</StyledSectionNumber>;
}

export default SectionNumber;
