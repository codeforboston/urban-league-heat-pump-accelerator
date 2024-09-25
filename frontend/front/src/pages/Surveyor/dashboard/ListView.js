import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useSearchParams } from "react-router-dom";
import CustomSnackbar from "../../../components/CustomSnackbar";
import Loader from "../../../components/Loader";
import { useAssignmentsForCurrentUser } from "../../../hooks/useDataForSurveyor";
import AssignmentUnit from "./AssignmentUnit";
import LocationPermission from "./LocationPermission";

const ListView = () => {
  const {
    data: assignmentsData,
    isLoading: isLoadingAssignments,
    error: isAssignmentsError,
  } = useAssignmentsForCurrentUser();

  const [openAccordion, setOpenAccordion] = useState();

  const [searchParams] = useSearchParams();

  // open the accordion of the first incomplete assignment when the page opens
  useEffect(() => {
    setOpenAccordion((assignmentsData || []).find((a) => !a.completed)?.id);
  }, [assignmentsData]);

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
            <LocationPermission />
            {(!assignmentsData || assignmentsData.length === 0) && (
              <Typography variant="h5">No assignments found.</Typography>
            )}
          </Stack>

          {assignmentsData?.map((item, i) => {
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
