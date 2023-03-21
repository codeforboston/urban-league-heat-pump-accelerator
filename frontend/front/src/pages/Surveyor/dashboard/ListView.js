import { Box, Typography } from "@mui/material";
import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentUnit from "./AssignmentUnit";
import data from "../../../dummyData/homeDataCluster1.json";

const ListView = () => {
  const quickData = [
    { id: "1", data: data },
    { id: "2", data: data },
  ];

  return (
    <Box>
      <Box my={3} display={"flex"} justifyContent="center">
        <Typography variant="h4">Assignment</Typography>
      </Box>
      {quickData.map((item) => {
        return (
          <Box my={2}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h5">Id: {item.id}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AssignmentUnit data={item.data} />
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      })}
    </Box>
  );
};

export default ListView;
