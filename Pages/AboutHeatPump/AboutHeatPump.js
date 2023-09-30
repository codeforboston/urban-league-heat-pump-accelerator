import { Box, Container, Stack, useTheme, useMediaQuery } from "@mui/material";
import React from "react";
import heatpump from "../../../../assets/images/heatPump-outside.png";
import ButtonDarkBlue from "../../Components/Button/ButtonDarkBlue";
import Heading1 from "../../Components/Typography/Heading1";
import Heading1BlueBgGround from "../../Components/Typography/Heading1BlueBgGround";
import Heading4 from "../../Components/Typography/Heading4";
import AboutHeatPumpCards from "./AboutHeatPumpsCards";
import CardsSection from "../../Components/CardsSection";

const cardContent = [
  {
    mediaType: "img",
    mediaSource: heatpump,
    title: "What is a heat pump?",
    body: "Check out this comprehensive article that Carrier, a heat pump manufacturer, has written up about what a heat pump is and how they work.",
    link: "https://www.carrier.com/residential/en/us/products/heat-pumps/what-is-a-heat-pump-how-does-it-work/",
    linkDescription: "Read Article",
  },
  {
    mediaType: "iframe",
    mediaSource: "https://www.youtube.com/embed/iQaycSD5GWE",
    title: "How does a heat pump work?",
    body: "This Old House plumbing and heating expert Richard Tretheway instructs Kevin O’Connor on the basic principles of how a heat pump works.",
  },
  {
    mediaType: "iframe",
    mediaSource: "https://youtube.com/embed/PIulbHyK0bc",
    title: "Why are heat pumps better?",
    body: "This video by Vox explains why heat pumps are better for the environment than fossil fuel heaters.",
  },
  {
    mediaType: "iframe",
    mediaSource: "https://www.youtube.com/embed/Ep9zqk5bVaU",
    title: "What do other people say?",
    body: "Hear what someone else has to say about their experience getting a heat pump installed in their home.",
  },
];

function AboutHeatPump() {
  const theme = useTheme();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      mb={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 520px)",
      }}
    >
      <Heading1BlueBgGround text="About Heat Pumps" />
      <Container>
        {/* <Box mb={{ xs: 1, sm: 6 }} mt={{ xs: 1, sm: 2 }}>
          {isSmallerThanMd ? (
            <Heading1
              fontWeight="500"
              text="Learn how heat pumps work and why they are right for you!"
            />
          ) : (
            <>
              <Heading1 fontWeight="500" text="Learn how heat pumps work " />
              <Heading1
                fontWeight="500"
                text="and why they are right for you!"
              />
            </>
          )}
        </Box> */}
        {/* <Stack direction="column" spacing={{ xs: 4, lg: 8 }}>
          {cardContent.map((card, index) => {
            return (
              <AboutHeatPumpCards
                key={index}
                mediaType={card.mediaType}
                mediaSource={card.mediaSource}
                title={card.title}
                body={card.body}
                link={card.link}
                linkDescription={card.linkDescription}
              />
            );
          })}
        </Stack> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: "10px", lg: "60px" },
          }}
        >
          {cardContent.map((card, index) => {
            return (
              <CardsSection
                key={index}
                mediaType={card.mediaType}
                mediaSource={card.mediaSource}
                title={card.title}
                body={card.body}
                linkDescription={card.linkDescription}
                link={card.link}
              />
            );
          })}
        </Box>
        <Stack alignItems="center" spacing="20px" mt={3}>
          <Box align="center">
            <Heading4 text="Convinced a heat pump is for you?" />
            <Heading4 text="Get started here!" />
          </Box>
          <ButtonDarkBlue text="GET A HEAT PUMP" to="/public/get-heat-pump" />
        </Stack>
      </Container>
    </Box>
  );
}

export default AboutHeatPump;
