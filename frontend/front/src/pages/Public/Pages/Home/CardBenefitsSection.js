import React from "react";
import { useTranslation } from "react-i18next";
import {
  Typography,
  Box,
  Grid,
  CardContent,
  CardActions,
  Button,
  Stack,
  Container,
} from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AnimatedBox from "../../Components/AnimatedBox";
import imageTwo from "../../../../assets/images/heat-pump-outside-home.jpg";
import liveMoreCom from "../../../../assets/images/copywritingImages/liveMoreCom.jpg";
import strengthenCommunity from "../../../../assets/images/copywritingImages/StrengthenCommunity.jpg";
import beEnvironmentally from "../../../../assets/images/copywritingImages/beEnvironmentally.jpg";
import Heading1 from "../../Components/Typography/Heading1";
import Heading3 from "../../Components/Typography/Heading3";

const StyledGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const CardBenefitsSection = () => {
  const { t } = useTranslation();

  const cards = [
    {
      id: 1,
      title: t("public.home.cardBenefitsSection.item1.title"),
      paragraphs: [t("public.home.cardBenefitsSection.item1.text1")],
      image: liveMoreCom,
      buttonText: "",
      buttonLink: "",
    },
    {
      id: 2,
      title: t("public.home.cardBenefitsSection.item2.title"),
      paragraphs: [t("public.home.cardBenefitsSection.item2.text1")],
      image: imageTwo,
      buttonText: "",
      buttonLink: "",
    },
    {
      id: 3,
      title: t("public.home.cardBenefitsSection.item3.title"),
      paragraphs: [t("public.home.cardBenefitsSection.item3.text1")],
      image: strengthenCommunity,
      buttonText: "",
      buttonLink: "",
    },
    {
      id: 4,
      title: t("public.home.cardBenefitsSection.item4.title"),
      paragraphs: [t("public.home.cardBenefitsSection.item4.text1")],
      image: beEnvironmentally,
      buttonText: "",
      buttonLink: "",
    },
  ];

  return (
    <Container>
      <Box pb={8} pt={2}>
        <Box
          pb={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Heading1 text={t("public.home.cardBenefitsSection.heading1")} />
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <Typography
              variant="body"
              sx={{ color: "var(--color-text-3)", display: "inline-block" }}
            >
              {t("public.home.cardBenefitsSection.subtitle1")}&nbsp;
              <MuiLink
                component={Link}
                to="benefits-heat-pump"
                variant="body"
                sx={{
                  color: "var(--color-text-3) !important",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(25, 118, 210, 0.4);",
                  textDecorationThickness: "1px",
                  textUnderlineOffset: "2px",
                  ":hover": {
                    textDecorationColor: "var(--color-text-3)",
                    textDecorationThickness: "1px",
                  },
                }}
              >
                {t("public.home.cardBenefitsSection.link")}
              </MuiLink>
            </Typography>
          </Stack>
        </Box>
        {cards.map((card, index) => (
          <Grid
            container
            key={card.id}
            columnSpacing={{ xs: 0, sm: 1, md: 4 }}
            sx={{
              p: { xs: 0, sm: 1, md: 2 },
              flexDirection: {
                md: `${index % 2 === 0 ? "row" : "row-reverse"}`,
                xs: "row",
              },
            }}
          >
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: "100%", sm: "auto", md: "100%" },
                }}
              >
                <Box
                  component="img"
                  sx={{
                    objectFit: "cover", // ou "contain"
                    width: "100%",
                    height: "100%",
                  }}
                  src={card.image}
                  alt={card.title}
                />
              </Box>
            </Grid>

            <StyledGrid item sx={{ pt: { xs: 2, sm: 0 } }} xs={12} sm={6}>
              <AnimatedBox triggerOnce={false}>
                <Box sx={{ p: { md: 4, xs: 0 } }}>
                  <Box pl={2}>
                    <Heading3 text={card.title} />
                  </Box>
                  <CardContent>
                    {card.paragraphs.map((paragraph, i) => (
                      <Typography
                        key={`p${i}`}
                        gutterBottom
                        variant="body"
                        color="var(--color-text-3)"
                      >
                        {paragraph}
                      </Typography>
                    ))}
                    {card.buttonLink !== "" && (
                      <CardActions
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button
                          component={Link}
                          to={card.buttonLink}
                          sx={{ color: "var(--color-text-6)" }}
                        >
                          {card.buttonText}
                        </Button>
                      </CardActions>
                    )}
                  </CardContent>
                </Box>
              </AnimatedBox>
            </StyledGrid>
          </Grid>
        ))}
      </Box>
    </Container>
  );
};

export default CardBenefitsSection;
