import { Box, Container, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import React from "react";
import heatpump from "../../../../assets/images/heatPump-outside.png";
import ButtonDarkBlue from "../../Components/Button/ButtonDarkBlue";
import Heading1BlueBgGround from "../../Components/Typography/Heading1BlueBgGround";
import Heading4 from "../../Components/Typography/Heading4";
import CardsSection from "../../Components/CardsSection";

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
      mediaSource: "https://www.youtube.com/embed/iQaycSD5GWE",
      title: t("public.about-heat-pump.item2.title"),
      body: t("public.about-heat-pump.item2.body"),
    },
    {
      mediaType: "iframe",
      mediaSource: "https://youtube.com/embed/PIulbHyK0bc",
      title: t("public.about-heat-pump.item3.title"),
      body: t("public.about-heat-pump.item3.body"),
    },
    {
      mediaType: "iframe",
      mediaSource: "https://www.youtube.com/embed/Ep9zqk5bVaU",
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
