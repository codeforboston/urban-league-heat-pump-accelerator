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

const ContentGridContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "50px auto auto auto auto",
  columnGap: "20px",
  [theme.breakpoints.down("md")]: {
    padding: "0px",
  },
  [theme.breakpoints.up("md")]: {
    padding: "40px 34px",
  },
  background: "#FAFBFD",
}));
const SectionNumberLarge = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  [theme.breakpoints.up("md")]: {
    display: "block",
    px: "12px",
  },
}));
const SectionNumberSmall = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
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
          <SectionNumberLarge>
            <SectionNumber number={1} />
          </SectionNumberLarge>
          <Container disableGutters>
            {/*CSS Grid container */}
            <ContentGridContainer>
              {/*Section number for small screen/ hiddden for large screen */}
              <SectionNumberSmall>
                <SectionNumber number={1} />
              </SectionNumberSmall>
              {/*section content*/}
              <Box
                sx={{
                  pt: "13px",
                  gridColumn: { xs: "2/span 4", md: "1/span 4" },
                }}
              >
                <SectionTitle
                  title={"Get Details About Your Home Heating/Cooling Needs"}
                />
                <Step1Section />
              </Box>
            </ContentGridContainer>
          </Container>
        </SectionContainer>

        {/*Step 2 Section*/}
        <SectionContainer>
          {/*Section number for large screen/ hiddden for small screen */}
          <SectionNumberLarge>
            <SectionNumber number={2} />
          </SectionNumberLarge>
          <Container disableGutters>
            {/*CSS Grid container */}
            <ContentGridContainer>
              {/*Section number for small screen/ hiddden for large screen */}
              <SectionNumberSmall
                sx={{ display: { xs: "block", md: "none" }, width: "60px" }}
              >
                <SectionNumber number={2} />
              </SectionNumberSmall>
              {/*section Title*/}
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
              {/*section Button*/}
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
            </ContentGridContainer>
          </Container>
        </SectionContainer>

        {/*Step 3 Section*/}
        <SectionContainer>
          {/*Section number for large screen/ hiddden for small screen */}
          <SectionNumberLarge>
            <SectionNumber number={3} />
          </SectionNumberLarge>
          <Container disableGutters>
            {/*CSS Grid container */}
            <ContentGridContainer>
              {/*Section number for small screen/ hiddden for large screen */}
              <SectionNumberSmall>
                <SectionNumber number={3} />
              </SectionNumberSmall>
              {/*section Title*/}
              <Box
                sx={{
                  pt: "13px",
                  gridColumn: { xs: "2/span 4", md: "1/span 4" },
                }}
              >
                <SectionTitle title="Contact a Heat Pump Installer" />
              </Box>
              {/*section Button*/}
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
            </ContentGridContainer>
          </Container>
        </SectionContainer>
      </Stack>
    </Box>
  );
};

export default GetHeatPump;
