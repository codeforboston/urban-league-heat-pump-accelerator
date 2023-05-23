import { Box, Container, Stack, Typography, styled } from "@mui/material";
import React from "react";
import Heading1BlueBgGround from "../Components/Typography/Heading1BlueBgGround";
import ExternalLinkButton from "./GetHeatPump/ExternalLinkButton";
import SectionNumber from "./GetHeatPump/SectionNumber";
import SectionTitle from "./GetHeatPump/SectionTitle";
import Step1Section from "./GetHeatPump/Step1Section";

const SectionContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    background: "#FAFBFD",
  },
  [theme.breakpoints.up("md")]: {
    background: "transparent",
  },
  minHeight: "308px",
  display: "flex",
  alignItems: "center",
  gap: "82px",
}));

const GetHeatPump = () => {
  return (
    <Box sx={{ mb: "53px" }}>
      {/*Page Title */}
      <Heading1BlueBgGround text="How To Get a Heat Pump?" />
      {/*SubTile */}
      <Container
        maxWidth={false}
        sx={{
          marginTop: { xs: "23px", md: "73px" },
          maxWidth: "1328px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "var(--font-family-1)",
            textAlign: { xs: "left", md: "center" },
            fontWeight: 600,
            color: "var(--bgColor-2)",
          }}
        >
          Calculate your savings in 3 easy steps
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "#0A0B0B",
            mt: { xs: "4px", md: "61px" },
          }}
        >
          To get a heat pump, start by getting some details about your home so
          you can have an informed conversation about how heat pumps can help
          you.
        </Typography>
      </Container>

      <Stack
        spacing={{ xs: 4, md: 6 }}
        direction="column"
        alignItems="center"
        sx={{ marginTop: "53px" }}
      >
        {/*Step 1 Section*/}
        <SectionContainer>
          {/*Section number for large screen/ hiddden for small screen */}
          <Box sx={{ display: { xs: "none", md: "block" }, px: "12px" }}>
            <SectionNumber number={1} />
          </Box>
          {/*CSS Grid container */}
          <Container disableGutters>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto auto auto auto auto",
                columnGap: "30px",
                py: { xs: "0px", md: "40px" },
                px: { xs: "0px", md: "34px" },
                background: "#FAFBFD",
              }}
            >
              {/*Section number for small screen/ hiddden for large screen */}
              <Box sx={{ display: { xs: "block", md: "none" } }}>
                <SectionNumber number={1} />
              </Box>
              {/*section content*/}
              <Box
                sx={{
                  pt: "13px",
                  gridColumn: { xs: "2/span 3", md: "1/span 4" },
                }}
              >
                <SectionTitle
                  title={"Get Details About Your Home Heating/Cooling Needs"}
                />
                <Step1Section />
              </Box>
            </Box>
          </Container>
        </SectionContainer>

        {/*Step 2 Section*/}
        <SectionContainer>
          {/*Section number for large screen/ hiddden for small screen */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {/*number for large screen*/}
            <SectionNumber number={2} />
          </Box>
          <Container disableGutters>
            {/*CSS Grid container */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto auto auto auto auto",
                columnGap: "30px",
                py: { xs: "0px", md: "40px" },
                px: { xs: "0px", md: "34px" },
                background: "#FAFBFD",
              }}
            >
              {/*Section number for small screen/ hiddden for large screen */}
              <Box sx={{ display: { xs: "block", md: "none" } }}>
                <SectionNumber number={2} />
              </Box>
              {/*section content*/}
              <Box
                sx={{
                  pt: "13px",
                  gridColumn: { xs: "2/span 4", md: "1/span 4" },
                }}
              >
                <SectionTitle
                  title="Talk with a Heat Pump Coach"
                  subtitle="(Optional but recommend)"
                />
              </Box>
              <Box
                sx={{
                  pt: "13px",
                  gridColumn: { xs: "2/span 4", md: "1/span 4" },
                  placeSelf: { lg: "center" },
                }}
              >
                <ExternalLinkButton
                  link="https://heatsmartalliance.org/request-a-coach-2/"
                  text="REQUEST A COACH"
                  sx={{ mt: "67px" }}
                />
              </Box>
            </Box>
          </Container>
        </SectionContainer>
        {/*Step 3 Section*/}
        <SectionContainer>
          {/*Section number for large screen/ hiddden for small screen */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <SectionNumber number={3} />
          </Box>
          <Container disableGutters>
            {/*CSS Grid container */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto auto auto auto auto",
                columnGap: "30px",
                py: { xs: "0px", md: "40px" },
                px: { xs: "0px", md: "34px" },
                background: "#FAFBFD",
              }}
            >
              {/*Section number for small screen/ hiddden for large screen */}
              <Box sx={{ display: { xs: "block", md: "none" } }}>
                <SectionNumber number={3} />
              </Box>
              {/*section content*/}
              <Box
                sx={{
                  pt: "13px",
                  gridColumn: { xs: "2/span 4", md: "1/span 4" },
                }}
              >
                <SectionTitle title="Contact a Heat Pump Installer" />
              </Box>
              <Box
                sx={{
                  pt: "13px",
                  gridColumn: { xs: "2/span 4", md: "1/span 4" },
                  placeSelf: { lg: "center" },
                }}
              >
                <ExternalLinkButton
                  link="https://heatsmartalliance.org/resources/"
                  text="RESOURCES"
                  sx={{ mt: "67px" }}
                />
              </Box>
            </Box>
          </Container>
        </SectionContainer>
      </Stack>
    </Box>
  );
};

export default GetHeatPump;
