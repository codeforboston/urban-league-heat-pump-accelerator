import { Box, Container, Typography } from "@mui/material";
import React from "react";
import streets from "../../../assets/images/copywritingImages/StrengthenCommunity.jpg";
import homeExterior from "../../../assets/images/home-exterior.jpg";
import AboutHeatPumpCards from "../Components/AboutHeatPumpsCards";
import PublicPageTile from "../Components/PublicPageTitle";

const cardContent = [
  {
    mediaType: "img",
    mediaSource: homeExterior,
    title: "What is a Heat Pump?",
    body: "Check out this comprehensive article that Carrier, a heat pump manufacturer, has written up about what a heat pump is and how they work.",
    link: "https://www.carrier.com/residential/en/us/products/heat-pumps/what-is-a-heat-pump-how-does-it-work/",
    linkDescription: "read article",
  },
  {
    mediaType: "iframe",
    mediaSource: "https://www.youtube.com/embed/iQaycSD5GWE",
    title: "How does a heat pump work?",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
  {
    mediaType: "iframe",
    mediaSource: "https://youtube.com/embed/PIulbHyK0bc",
    title: "Why are heat pumps better",
    body: "This video by Vox explains why heat pumps are better for the environment than fossil fuel heaters.",
  },
  {
    mediaType: "img",
    mediaSource: streets,
    title: "What do other people say",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
];

function AboutHeatPump() {
  return (
    <Box>
      <PublicPageTile pageTitle="About Heat Pumps" />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "10px", lg: "60px" },
          maxWidth: { xs: "353px", lg: "1300px" },
          marginTop: { xs: "20px", lg: "60px" },
          paddingLeft: 0,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            maxWidth: "905px",
            fontSize: { xs: "1.5rem", lg: "3.875rem" },
            fontWeight: 500,
            color: "var(--color-text-8)",
          }}
        >
          Learn how heat pumps work and why they are right for you!
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: "10px", lg: "60px" },
          }}
        >
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
        </Box>
      </Container>
    </Box>
  );
}

export default AboutHeatPump;
