import { Box, Typography } from "@mui/material";
import React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useGetAssignmentsQuery } from "../../../api/apiSlice";
import AssignmentUnit from "./AssignmentUnit";

const ListView = () => {
  const { data, isLoading, isSuccess } = useGetAssignmentsQuery();

  let content;

  if (isLoading) {
    content = <Box> Is loading</Box>;
    console.log(data);
  } else if (isSuccess) {
    console.log(data);
    content = (
      <Box>
        <Box my={3} display={"flex"} justifyContent="center">
          <Typography variant="h4">Assignment</Typography>
        </Box>
        {data &&
          data.map((item) => {
            return (
              <Box my={2} key={item.id}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h5">Id: {item.id}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AssignmentUnit data={item.homes} />
                  </AccordionDetails>
                </Accordion>
              </Box>
            );
          })}
      </Box>
    );
  }

  return content;
};

export default ListView;
