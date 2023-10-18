import { Box, Container } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import card1 from "../../../assets/images/copywritingImages/jason-goodman-NYMJYXfZG-g-unsplash.jpg";
import card2 from "../../../assets/images/copywritingImages/todd-kent-iRKv_XiN--M-unsplash.jpg";
import card3 from "../../../assets/images/copywritingImages/erika-giraud-H6xKnDKrKDk-unsplash.jpg";
import card4 from "../../../assets/images/copywritingImages/aubrey-odom--J0uMCDL2KQ-unsplash.jpg";
import CardsSection from "../Components/CardsSection";
import Heading1BlueBgGround from "../Components/Typography/Heading1BlueBgGround";
import SocialSharingKit from "../../../assets/pdfDownload/SocialSharingKit.pdf";
import CommunityFlyer from "../../../assets/pdfDownload/CommunityFlyer.pdf";

function GetInvolved() {
  const { t } = useTranslation();

  const cardContent = [
    {
      mediaType: "img",
      mediaSource: card1,
      title: t("public.getInvolved.title1"),
      body: "Let your neighbors know about the savings and other benefits of heat pumps. Share this website on social media or through email.",
      linkDescription: "Download social sharing kit",
      linkDownload: SocialSharingKit,
    },
    {
      mediaType: "img",
      mediaSource: card2,
      title: "Post flyers at local businesses",
      body: "Print and post this flyer at cafes, conveniences, and community bulletin boards around your neighborhood.",
      linkDescription: "Download informational flyer",
      linkDownload: CommunityFlyer,
    },
    {
      mediaType: "img",
      mediaSource: card3,
      title: "Discuss with your community",
      body: "Help to organize and/or host an event for neighbors to learn about heat pumps and their benefits.",
    },
    {
      mediaType: "img",
      mediaSource: card4,
      title: "Share with your local legislators",
      body: "Assist your neighbors in transitioning towards cheaper and cleaner energy by seeking local initiatives and communicating with your elected representatives to express your preference for heat pumps. Use the following free service to get contact info for a call, email, or letter to your elected representatives.",
      linkDescription: "Contact your elected officials",
      link: "https://www.usa.gov/elected-officials",
    },
  ];

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
      <Heading1BlueBgGround text="Get Involved" />
      <Container>
        {/* <Box mb={{ xs: 1, sm: 6 }} mt={{ xs: 1, sm: 2 }}>
          <Heading1
            fontWeight="500"
            text="Serve your community and spread the word about the Boston Heat Pump Accelerator!"
          />
        </Box> */}

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
                linkDownload={card.linkDownload}
                link={card.link}
              />
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

export default GetInvolved;
