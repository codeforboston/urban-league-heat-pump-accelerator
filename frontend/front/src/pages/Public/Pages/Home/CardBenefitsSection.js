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

const StyledGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const CardBenefitsSection = () => {
  const cards = [
    {
      id: 1,
      title: "Live More Comfortably",
      paragraphs: [
        "Heat pumps can help you keep cool in summer and keep warm in winter. They are nearly silent, work continuously, and are reliable.",
      ],
      image: liveMoreCom,
      buttonText: "",
      buttonLink: "",
    },
    {
      id: 2,
      title: "Improve Heating and Cooling",
      paragraphs: [
        "Heat pumps are effective, continuous, nearly silent and extremely energy efficient. Rather than provide blasts of hot or cold air, heat pumps provide continuous, low-level operation.",
      ],
      image: imageTwo,
      buttonText: "",
      buttonLink: "",
    },
    {
      id: 3,
      title: "Strengthen Community",
      paragraphs: [
        "Because heat pumps can lower your utility bills, they can help seniors and low-income residents stay in their homes longer.",
      ],
      image: strengthenCommunity,
      buttonText: "",
      buttonLink: "",
    },
    {
      id: 4,
      title: "Be Environmentally Friendly",
      paragraphs: [
        "To help address climate change, we all need to reduce our greenhouse gas emissions. Heat pumps can help because they are powered by electricity rather than fossil fuels. Because they handle both cooling and heating, you can have one rather than two systems for a comfortable home.",
      ],
      image: beEnvironmentally,
      buttonText: "",
      buttonLink: "",
    },
  ];

  return (
    <Container>
      <Box pb={8} pt={4}>
        <Box
          pb={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Typography variant="title1">Benefits of Heat Pumps</Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <Typography
              variant="subtitle2"
              sx={{ color: "var(--color-text-6)" }}
            >
              Learn more about&nbsp;
            </Typography>
            <Link to="benefits-heat-pump">
              <Typography
                variant="subtitle2"
                sx={{ color: "var(--color-text-2)" }}
              >
                Benefits of Heat Pump
              </Typography>
            </Link>
          </Stack>
        </Box>
        {cards.map((card, index) => (
          <Grid
            container
            key={card.id}
            columnSpacing={{ xs: 0, sm: 1, lg: 0 }}
            sx={{
              p: { xs: 0, sm: 1, lg: 0 },
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
              <AnimatedBox>
                <Box sx={{ p: { md: 4, xs: 0 } }}>
                  <Typography pl={2} variant="title3">
                    <span>{card.title}</span>
                  </Typography>
                  <CardContent>
                    {card.paragraphs.map((paragraph) => (
                      <Typography
                        gutterBottom
                        variant="body1"
                        color="var(--color-text-6)"
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
                          sx={{ color: "var(--color-text-4)" }}
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
