import { Typography, Box } from "@mui/material";

function SectionTitle({ title, subtitle }) {
  return (
    <Typography variant="h5" sx={{ fontWeight: 500 }}>
      {title}{" "}
      {subtitle && (
        <Box component="span" sx={{ fontWeight: 400, verticalAlign: "middle" }}>
          {subtitle}
        </Box>
      )}
    </Typography>
  );
}

export default SectionTitle;
