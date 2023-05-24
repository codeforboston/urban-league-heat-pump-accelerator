import { Box, Container, Stack, Typography, styled } from "@mui/material";
import React from "react";
import Heading1BlueBgGround from "../../Components/Typography/Heading1BlueBgGround";
import SectionNumber from "./SectionNumber";
import SectionTitle from "./SectionTitle";
import Step1Section from "./Step1Section";
import Heading2 from "../../Components/Typography/Heading2";
import ButtonDarkBlue from "../../Components/Button/ButtonDarkBlue";

const SectionContainer = styled(Box)(({ theme }) => ({
  minHeight: "325px",
  display: "flex",
  alignItems: "center",
}));

const GetHeatPump = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 560px)",
      }}
    >
      {/*Page Title */}
      <Heading1BlueBgGround text="How To Get a Heat Pump?" />

      <Container sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Stack direction="column">
          <Box
            sx={{
              textAlign: { xs: "left", md: "center" },
              my: { xs: 2, sm: 6 },
            }}
          >
            {/*SubTile */}
            <Heading2 text="Calculate your savings in 3 easy steps" />
          </Box>
          <Typography variant="h5">
            To get a heat pump, start by getting some details about your home so
            you can have an informed conversation about how heat pumps can help
            you.
          </Typography>

          <Stack
            spacing={{ xs: 4, md: 6 }}
            direction="column"
            alignItems="center"
            sx={{ marginTop: "53px" }}
          >
            {/*Step 1 Section*/}
            <SectionContainer>
              <SectionNumber number={1} />
              <Container disableGutters>
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
              </Container>
            </SectionContainer>

            {/*Step 2 Section*/}
            <SectionContainer>
              <SectionNumber number={2} />

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
                <ButtonDarkBlue
                  text="REQUEST A COACH"
                  to="https://heatsmartalliance.org/request-a-coach-2/"
                  externalLink={true}
                />
              </Box>
            </SectionContainer>

            {/*Step 3 Section*/}
            <SectionContainer>
              <SectionNumber number={3} />

              <Box mx={{ xs: 2, sm: 8 }}>
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
                  <ButtonDarkBlue
                    text="RESOURCES"
                    to="https://heatsmartalliance.org/resources/"
                    externalLink={true}
                  />
                </Box>
              </Box>
            </SectionContainer>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default GetHeatPump;
