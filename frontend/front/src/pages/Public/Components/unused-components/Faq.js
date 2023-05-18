import React from "react";
import {
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = () => {
  return (
    <Grid
      container
      display="flex"
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <Grid item>
        <Box
          m={3}
          sx={{
            width: 390,
            height: 229,
            display: "flex",
            backgroundColor: "#98C7D6",
            direction: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography
            variant="h4"
            mb={3}
            textAlign="center"
            justifyContent="center"
          >
            FAQ
          </Typography>
        </Box>

        <Box
          m={3}
          sx={{
            width: 390,
            height: 229,
            display: "flex",
            direction: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography
            variant="h4"
            mb={3}
            textAlign="center"
            justifyContent="center"
          >
            <Link href="#section-1" style={{ textDecoration: "none" }}>
              <Typography variant="h5">Section 1 Jump</Typography>
            </Link>
            <Link href="#section-2" style={{ textDecoration: "none" }}>
              <Typography variant="h5">Section 2 Jump</Typography>
            </Link>
            <Link href="#section-3" style={{ textDecoration: "none" }}>
              <Typography variant="h5">Section 3 Jump</Typography>
            </Link>
          </Typography>
        </Box>
      </Grid>

      {/* Section 1 */}
      <Stack mb={4}>
        <Typography variant="h4" m={3} textAlign="center" id="section-1">
          Section 1 Title
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color="#03045E">
              How can I dolor sit amet, velit esse cillum dolore eu fugiat nulla
              pariatur?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color="#03045E">
              Where can I find consectetur adipiscing elit. Suspendisse
              malesuada lacus?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color="#03045E">
              Why does dolor sit amet, elit, sed ut labore et dolore magna
              aliqua?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>

      {/* Section 2 */}
      <Stack mb={4}>
        <Typography variant="h4" m={3} textAlign="center" id="section-2">
          Section 2 Title
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color="#03045E">
              How can I dolor sit amet, velit esse cillum dolore eu fugiat nulla
              pariatur?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color="#03045E">
              Where can I find consectetur adipiscing elit. Suspendisse
              malesuada lacus?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color="#03045E">
              Why does dolor sit amet, elit, sed ut labore et dolore magna
              aliqua?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>

      {/* Section 3 */}
      <Stack mb={4}>
        <Typography variant="h4" m={3} textAlign="center" id="section-3">
          Section 3 Title
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color="#03045E">
              How can I dolor sit amet, velit esse cillum dolore eu fugiat nulla
              pariatur?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color="#03045E">
              Where can I find consectetur adipiscing elit. Suspendisse
              malesuada lacus?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color="#03045E">
              Why does dolor sit amet, elit, sed ut labore et dolore magna
              aliqua?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Grid>
  );
};

export default Faq;
