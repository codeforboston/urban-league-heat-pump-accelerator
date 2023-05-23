import { Box } from "@mui/material";
import ExternalLinkButton from "./ExternalLinkButton";
import SectionTitle from "./SectionTitle";

function Step3Section() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SectionTitle
        number="3"
        title="Talk with a Heat Pump Coach"
        subtitle="(Optional but recommend)"
      />

      <ExternalLinkButton
        link="https://www.masssave.com/residential/heating-comparison-calculator"
        text="Contact a Heat Pump Installers"
        margin="36px"
      />
    </Box>
  );
}

export default Step3Section;
