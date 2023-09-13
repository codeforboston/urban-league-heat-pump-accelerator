import React from "react";
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
  const cards = [
    {
      id: 1,
      title: "Lower energy bills",
      paragraphs: [
        "Heat pumps are so energy efficient that they can lead to significant savings on monthly utility bills and lower maintenance, repair and replacement costs.",
      ],
      image: liveMoreCom,
      buttonText: "",
      buttonLink: "",
    },
    {
      id: 2,
      title: "Comfort at home",
      paragraphs: [
        "The same heat pump that helps to cool in the summer can then provide warmth in the winter- it's one system that is efficient, quiet, and convenient, providing comfort throughout the home.",
      ],
      image: imageTwo,
      buttonText: "",
      buttonLink: "",
    },
    {
      id: 3,
      title: "Stronger communities",
      paragraphs: [
        "By helping to lower utility bills, heat pumps can lower the cost of living for residents, which in turn can support residents living on fixed- or low-incomes to remain in their homes longer, strengthening communities.",
      ],
      image: strengthenCommunity,
      buttonText: "",
      buttonLink: "",
    },
    {
      id: 4,
      title: "Cleaner air",
      paragraphs: [
        "Heat pumps use electricity that can be produced by renewable sources. As the grid becomes more green, heat pumps become much more eco-friendly than gas or oil-fueled systems. With a single “green-powered” unit that heats and cools, your home’s carbon footprint is as low as it can go.",
      ],
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
          <Heading1 text="Benefits of Heat Pumps" />
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
              Learn more about the
            </Typography>
            <Link to="benefits-heat-pump" style={{ textDecoration: "none" }}>
              <Typography variant="body" sx={{ color: "var(--color-text-4)" }}>
                &nbsp;Benefits of Heat Pumps
              </Typography>
            </Link>
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
                component="img"
                sx={{
                  backgroundSize: "fit",
                  width: "100%",
                  height: "100%",
                }}
                src={card.image}
                alt={card.title}
              />
            </Grid>
            <StyledGrid item sx={{ pt: { xs: 2, md: 0 } }} xs={12} sm={6}>
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
