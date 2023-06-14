import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CorePanel from "./CorePanel";
import AssessmentPanel from "./AssessmentPanel";
import QuestionPanel from "./QuestionPanel";

export default function AccordionWrap() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ bgcolor: "whitesmoke" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ backgroundColor: "#1976d2", color: "white" }}
        >
          <Typography variant="h5" sx={{ width: "50%", flexShrink: 0 }}>
            Core
          </Typography>
          <Typography sx={{ color: "white" }}>Incomplete</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CorePanel />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{ mt: 2, bgcolor: "whitesmoke" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          sx={{ backgroundColor: "#1976d2", color: "white" }}
        >
          <Typography variant="h5" sx={{ width: "50%", flexShrink: 0 }}>
            Question
          </Typography>
          <Typography sx={{ color: "white" }}>Incomplete</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <QuestionPanel />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{ mt: 2, bgcolor: "whitesmoke" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          sx={{ backgroundColor: "#1976d2", color: "white" }}
        >
          <Typography variant="h5" sx={{ width: "50%", flexShrink: 0 }}>
            Assessment
          </Typography>
          <Typography sx={{ color: "white" }}>Incomplete </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AssessmentPanel />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
