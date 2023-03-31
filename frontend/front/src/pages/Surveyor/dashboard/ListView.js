import { Box, Typography } from "@mui/material";
import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentUnit from "./AssignmentUnit";
import { useGetSurveyorAssignmentQuery } from "../../../redux/surveyorViewApiSlice";

const ListView = () => {
  const { data, isLoading, isSuccess } = useGetSurveyorAssignmentQuery();

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
        {/* {data &&
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
                    <AssignmentUnit data={item.data} />
                  </AccordionDetails>
                </Accordion>
              </Box>
            );
          })} */}
      </Box>
    );
  }

  return content;
};

export default ListView;
