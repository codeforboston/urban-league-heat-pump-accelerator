import { Box, Container } from "@mui/material";
import React from "react";
import streets from "../../../../assets/images/copywritingImages/StrengthenCommunity.jpg";
import homeExterior from "../../../../assets/images/home-exterior.jpg";
// import cardContent from "./cardContent";
import CardsSection from "../../Components/CardsSection";
import Heading1BlueBgGround from "../../Components/Typography/Heading1BlueBgGround";
import Heading1 from "../../Components/Typography/Heading1";

function GetInvolved() {
  const cardContent = [
    {
      mediaType: "img",
      mediaSource: streets,
      title: "Share with your community",
      body: "Let people know about the cost savings and other benefits they are missing out on by sharing this website on social media or through email. Download this social sharing kit for ideas!",
      link: "https://www.google.com/",
      linkDescription: "Download social sharing kit",
    },
    {
      mediaType: "img",
      mediaSource: streets,
      title: "Post flyers at local businesses",
      body: "Do you know places like cafes, convenience stores, or community bulletin boards where people post local announcements? Print and share this information flyer around town!",
      link: "https://www.google.com/",
      linkDescription: "Download informational flyer",
    },
    {
      mediaType: "img",
      mediaSource: streets,
      title: "Discuss with your community",
      body: "You can host any sort of event and share flyers about how to help your neighbors save money by getting a heat pump!",
      link: "https://www.google.com/",
      linkDescription: "Download informational flyer",
    },
    {
      mediaType: "img",
      mediaSource: streets,
      title: "Share with your local legislators",
      body: "Assist your neighbors in transitioning towards cheaper and cleaner energy by seeking local initiatives and communicating with your elected representatives to express your preference for heat pumps.",
    },
  ];

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
      <Heading1BlueBgGround text="Get Involved" />
      <Container>
        <Box mb={{ xs: 1, sm: 6 }} mt={{ xs: 1, sm: 2 }}>
          <Heading1
            fontWeight="500"
            text="Serve your community and spread the word about the Boston Heat Pump Accelerator!"
          />
        </Box>

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

export default GetInvolved;
