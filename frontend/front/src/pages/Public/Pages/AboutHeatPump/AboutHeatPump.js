import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import heatpump from "../../../../assets/images/heatPump-outside.png";
import ButtonDarkBlue from "../../Components/Button/ButtonDarkBlue";
import CardsSection from "../../Components/CardsSection";
import Heading1BlueBgGround from "../../Components/Typography/Heading1BlueBgGround";
import Heading4 from "../../Components/Typography/Heading4";

function AboutHeatPump() {
  const { t } = useTranslation();

  const cardContent = [
    {
      mediaType: "img",
      mediaSource: heatpump,
      title: t("public.about-heat-pump.item1.title"),
      body: t("public.about-heat-pump.item1.body"),
      link: "https://www.carrier.com/residential/en/us/products/heat-pumps/what-is-a-heat-pump-how-does-it-work/",
      linkDescription: t("public.about-heat-pump.item1.link"),
    },
    {
      mediaType: "iframe",
      mediaSource:
        "https://www.youtube.com/embed/iQaycSD5GWE?si=4VAQqOW9Ks7EVEWY",
      title: t("public.about-heat-pump.item2.title"),
      body: t("public.about-heat-pump.item2.body"),
    },
    {
      mediaType: "iframe",
      mediaSource:
        "https://www.youtube-nocookie.com/embed/PIulbHyK0bc?si=nO8zrFm-lWRUidSgc",
      title: t("public.about-heat-pump.item3.title"),
      body: t("public.about-heat-pump.item3.body"),
    },
    {
      mediaType: "iframe",
      mediaSource:
        "https://www.youtube-nocookie.com/embed/Ep9zqk5bVaU?si=8S8AhXZyIDhlYCIo",
      title: t("public.about-heat-pump.item4.title"),
      body: t("public.about-heat-pump.item4.body"),
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
      <Heading1BlueBgGround text={t("public.about-heat-pump.headingBg")} />
      <Container>
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
        <Stack alignItems="center" spacing="20px" mt={{ xs: 2, md: 8 }}>
          <Box align="center">
            <Heading4 text={t("public.about-heat-pump.button-section.text1")} />
            <Heading4 text={t("public.about-heat-pump.button-section.text2")} />
          </Box>
          <ButtonDarkBlue
            text={t("public.about-heat-pump.button-section.button")}
            to="/public/get-heat-pump"
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default AboutHeatPump;
