import { Box, Link, Typography } from "@mui/material";

function SupportContact() {
  return (
    <Box padding={2} textAlign="center">
      <Typography fontWeight="bold">Support Contact:</Typography>
      <Link href="mailto:help@bostonhpa.org">help@bostonhpa.org</Link>
    </Box>
  );
}

export default SupportContact;
