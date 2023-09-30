import { styled } from "@mui/material/styles";
import { Container, Typography, Box } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import pageContent from "./privacyContent.json";
import Heading1BlueBgGround from "../../Components/Typography/Heading1BlueBgGround";
import Heading2 from "../../Components/Typography/Heading2";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: "2px solid var(--color-text-5)",
  "&:not(:last-child)": {
    // borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  // backgroundColor: "var(--bgColor-3)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function PrivacyPolicy() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 520px)",
      }}
    >
      <Heading1BlueBgGround text="Privacy Policy" />

      <Container>
        <Typography>
          Last updated: April 19th, 2023 <br />
          Our{" "}
          <i>
            <u style={{ color: "var(--color-text-2)" }}>Privacy Policy</u>
          </i>{" "}
          has been updated.
        </Typography>
        <Typography py={3} variant="h6" sx={{ color: "var(--color-text-10)" }}>
          **This privacy policy of the Boston Heat Pump Accelerator (BHPA) will
          help you better understand how we collect, share, and use your
          personal information.**
        </Typography>
        <section>
          <Heading2
            text="Table of Contents"
            textDecoration="solid underline 2px"
          />
          <Box mb={6} mt={1}>
            {pageContent.map((c, i) => (
              <Accordion key={`privacy${i}`}>
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "var(--color-text-2)" }}
                  >
                    {c.heading}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body"
                    dangerouslySetInnerHTML={{ __html: c.content }}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </section>
      </Container>
    </Box>
  );
}

export default PrivacyPolicy;
