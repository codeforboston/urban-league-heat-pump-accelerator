import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledSectionTitle = styled(Typography)(({ theme }) => ({
  color: "#0A0B0B",
  fontWeight: 600,
  lineHeight: "1.563rem",
  [theme.breakpoints.up("xs")]: {
    fontSize: "1.25rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.875rem",
  },
}));

function SectionTitle({ title, subtitle }) {
  return (
    <StyledSectionTitle variant="h4">
      {title}
      {subtitle && (
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: "1rem", lg: "1.875rem" }, fontWeight: 400 }}
        >
          {subtitle}
        </Typography>
      )}
    </StyledSectionTitle>
  );
}

export default SectionTitle;
