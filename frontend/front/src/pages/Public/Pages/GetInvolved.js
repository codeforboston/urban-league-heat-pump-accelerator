import React from "react";
import { Box, Container } from "@mui/material";
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
      title: t("public.getInvolved.item1.title"),
      body: t("public.getInvolved.item1.body"),
      linkDescription: t("public.getInvolved.item1.link"),
      linkDownload: SocialSharingKit,
    },
    {
      mediaType: "img",
      mediaSource: card2,
      title: t("public.getInvolved.item2.title"),
      body: t("public.getInvolved.item2.body"),
      linkDescription: t("public.getInvolved.item2.link"),
      linkDownload: CommunityFlyer,
    },
    {
      mediaType: "img",
      mediaSource: card3,
      title: t("public.getInvolved.item3.title"),
      body: t("public.getInvolved.item3.body"),
    },
    {
      mediaType: "img",
      mediaSource: card4,
      title: t("public.getInvolved.item4.title"),
      body: t("public.getInvolved.item4.body"),
      linkDescription: t("public.getInvolved.item4.link"),
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
      <Heading1BlueBgGround text={t("public.getInvolved.heading")} />
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
