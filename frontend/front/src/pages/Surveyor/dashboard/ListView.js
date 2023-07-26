import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AssignmentUnit from "./AssignmentUnit";
import CustomSnackbar from "../../../components/CustomSnackbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Loader from "../../../components/Loader";
import { useAssignmentsForCurrentUser } from "../../../hooks/useDataForSurveyor";
import { useSearchParams } from "react-router-dom";
import { useAssignmentsWithCompleted } from "../../../hooks/useHomesWithCompleted";

const ListView = () => {
  const {
    data: assignmentsData,
    isLoading: isLoadingAssignments,
    error: isAssignmentsError,
  } = useAssignmentsForCurrentUser();

  const assignmentsWithCompleted = useAssignmentsWithCompleted(assignmentsData);

  const [openAccordion, setOpenAccordion] = useState();

  const [searchParams] = useSearchParams();

  // open the accordion of the first incomplete assignment when the page opens
  useEffect(() => {
    setOpenAccordion(
      (assignmentsWithCompleted || []).find((a) => !a.completed)?.id
    );
  }, [assignmentsWithCompleted]);

  return (
    <Box sx={{ width: "100%" }}>
      {!!isAssignmentsError && (
        <CustomSnackbar
          message="Error fetching assignments data."
          severity="error"
        />
      )}
      {searchParams.has("success") && (
        <CustomSnackbar
          severity="success"
          message={`Successfully submitted survey for home ${searchParams.get(
            "success"
          )}`}
        />
      )}
      {isLoadingAssignments ? (
        <Loader />
      ) : (
        <Box>
          <Stack my={3} alignItems="center">
            <Typography variant="h4">Your Assignments</Typography>
            {(!assignmentsWithCompleted || assignmentsData.length === 0) && (
              <Typography variant="h5">No assignments found.</Typography>
            )}
          </Stack>

          {assignmentsWithCompleted?.map((item, i) => {
            return (
              <Box my={2} key={item.id}>
                <Accordion
                  expanded={openAccordion === item.id}
                  onChange={() =>
                    openAccordion === item.id
                      ? setOpenAccordion(null)
                      : setOpenAccordion(item.id)
                  }
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h5">
                      {`${item.completed ? "✅" : ""} Assignment ${i + 1}`}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AssignmentUnit data={item.homes} />
                  </AccordionDetails>
                </Accordion>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default ListView;
