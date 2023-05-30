import { Box, Container, Stack } from "@mui/material";
import React from "react";
import heatpump from "../../../../assets/images/heatPump-outside.png";
import ButtonDarkBlue from "../../Components/Button/ButtonDarkBlue";
import Heading1 from "../../Components/Typography/Heading1";
import Heading1BlueBgGround from "../../Components/Typography/Heading1BlueBgGround";
import Heading3 from "../../Components/Typography/Heading3";
import AboutHeatPumpCards from "./AboutHeatPumpsCards";

const cardContent = [
  {
    mediaType: "img",
    mediaSource: heatpump,
    title: "What is a Heat Pump?",
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
    body: "Hear what people involved with similar projects around the country are saying about their new heating/cooling systems.",
  },
];

function AboutHeatPump() {
  return (
    <Box
      mb={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 560px)",
      }}
    >
      <Heading1BlueBgGround text="About Heat Pumps" />
      <Container>
        <Box mb={4} mt={4}>
          <Heading1 fontWeight="500" text="Learn how heat pumps work " />
          <Heading1 fontWeight="500" text="and why they are right for you!" />
        </Box>

        <Stack direction="column" spacing={{ xs: 4, lg: 8 }}>
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
        </Stack>
        <Stack alignItems="center" spacing="20px" marginTop="60px">
          <Box align="center">
            <Heading3 text="Convinced a heat pump is for you?" />
            <Heading3 text="Get started here!" />
          </Box>
          <ButtonDarkBlue text="GET A HEAT PUMP" to="/public/get-heat-pump" />
        </Stack>
      </Container>
    </Box>
  );
}

export default AboutHeatPump;
