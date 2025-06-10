import { useTranslation } from "react-i18next";
import { Box, Container, Stack, Typography } from "@mui/material";
import CardsSection from "../Components/CardsSection";
import Heading1BlueBgGround from "../Components/Typography/Heading1BlueBgGround";

function ForRenters() {
  const { t } = useTranslation();

  const cardContent = [
    {
      title: t("public.for-renters.item1.title"),
      body: t("public.for-renters.item1.body"),
      link: "place-holder.com",
      linkDescription: t("public.for-renters.item1.link"),
    },
    {
      title: t("public.for-renters.item2.title"),
      body: t("public.for-renters.item2.body"),
      link: "place-holder.com",
      linkDescription: t("public.for-renters.item2.link"),
    },
    {
      title: t("public.for-renters.item3.title"),
      body: t("public.for-renters.item3.body"),
      link: "place-holder.com",
      linkDescription: t("public.for-renters.item3.link"),
    },
    {
      title: t("public.for-renters.item4.title"),
      body: t("public.for-renters.item4.body"),
      link: "place-holder.com",
      linkDescription: t("public.for-renters.item4.link"),
    },
    {
      mediaType: "iframe",
      mediaSource:
        "https://www.youtube.com/embed/CHOrd1mIL3A?si=34wNFuafizJ3ZR_j",
      title: t("public.for-renters.item5.title"),
      body: t("public.for-renters.item5.body"),
    },
    {
      mediaType: "iframe",
      mediaSource:
        "https://www.youtube.com/embed/KNlDu_ZHIo8?si=7z8T8oB_YPnnJbzO",
      title: t("public.for-renters.item6.title"),
      body: t("public.for-renters.item6.body"),
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
      <Heading1BlueBgGround text={t("public.for-renters.headingBg")} />
      <Container>
        <Box mb={{ xs: 2, md: 6 }} px={{ xs: 2 }}>
          <Typography variant="body" sx={{ textAlign: "center" }}>
            {t("public.for-renters.heading2")}
          </Typography>
        </Box>
        <Stack direction="column" justifyContent="center" mb={3}>
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
        </Stack>
      </Container>
    </Box>
  );
}

export default ForRenters;
