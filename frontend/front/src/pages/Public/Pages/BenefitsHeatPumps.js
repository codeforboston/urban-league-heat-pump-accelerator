import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  Link,
  Stack,
  Container,
  useTheme,
  useMediaQuery,
  Icon,
} from "@mui/material";
import Heading1BlueBgGround from "../Components/Typography/Heading1BlueBgGround";
import Heading3 from "../Components/Typography/Heading3";
import Heading4 from "../Components/Typography/Heading4";
import moneyIcon from "../../../assets/images/Icons/money.png";
import snowSunIcon from "../../../assets/images/Icons/snow-sun.png";
import communityIcon from "../../../assets/images/Icons/community.png";
import heatIcon from "../../../assets/images/Icons/heat.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ButtonDarkBlue from "../Components/Button/ButtonDarkBlue";

const BenefitsHeatPumps = () => {
  const theme = useTheme();
  const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));

  const { t } = useTranslation();

  const cardBenefits = [
    {
      icon: moneyIcon,
      title: t("public.benefits-heat-pump.cardBenefits.item1.title"),
      body: t("public.benefits-heat-pump.cardBenefits.item1.body1"),
      bodyLink:
        "https://www.amerenmissourisavings.com/hvac-air-source-heat-pump-education-flyer/",
      body2: `). ${t("public.benefits-heat-pump.cardBenefits.item1.body2")}`,
      link: "https://www.masssave.com/residential/heating-comparison-calculator",
    },
    {
      icon: snowSunIcon,
      title: t("public.benefits-heat-pump.cardBenefits.item2.title"),
      body: t("public.benefits-heat-pump.cardBenefits.item2.body1"),
      bodyLink: "",
      link: "https://goclean.masscec.com/clean-energy-solutions/air-source-heat-pumps",
    },
    {
      icon: communityIcon,
      title: t("public.benefits-heat-pump.cardBenefits.item3.title"),
      body: t("public.benefits-heat-pump.cardBenefits.item3.body1"),
      bodyLink: "",
      link: "https://www.energy.gov/policy/articles/heat-pumps-keep-homes-warm-and-bills-low-winter",
    },
    {
      icon: heatIcon,
      title: t("public.benefits-heat-pump.cardBenefits.item4.title"),
      body: t("public.benefits-heat-pump.cardBenefits.item4.body1"),
      bodyLink: "",
      link: "https://goclean.masscec.com/clean-energy-solutions/",
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
      <Heading1BlueBgGround
        text={t("public.global-labels.learn-more.items.benefits-heat-pumps")}
      />
      <Container sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Stack direction="column">
          <Box>
            {cardBenefits.map((card) => (
              <Box mb={{ xs: 3, sm: 6 }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "center", sm: "flex-start" }}
                  spacing={2}
                >
                  <Box
                    component="img"
                    src={card.icon}
                    width="100px"
                    mr={{ xs: 0, sm: 2 }}
                    mb={{ xs: 2, sm: 0 }}
                    sx={{ display: { xs: "none", sm: "block" } }}
                  />

                  <Box>
                    <Box mb={1}>
                      {isSmallerThanSm ? (
                        <Heading3 text={card.title} icon={card.icon} />
                      ) : (
                        <Heading3 text={card.title} />
                      )}
                    </Box>
                    <Typography variant="body">
                      {card.body}
                      {card.bodyLink !== "" && (
                        <>
                          <Link
                            href={card.bodyLink}
                            target="_blank"
                            rel="noopener"
                            underline="always"
                            variant="body"
                            sx={{
                              color: "var(--color-text-3)",
                              textDecoration: "solid underline 1px",
                              textUnderlinePosition: "under",
                              textDecorationColor: "var(--color-text-3)",
                            }}
                          >
                            {t("public.global-labels.source")}
                          </Link>
                          {card.body2}
                        </>
                      )}
                      {card.link !== "" && (
                        <span>
                          <Link
                            href={card.link}
                            target="_blank"
                            rel="noopener"
                            underline="always"
                            variant="body"
                            sx={{
                              color: "var(--color-text-3)",
                              textDecoration: "solid underline 1px",
                              textUnderlinePosition: "under",
                              textDecorationColor: "var(--color-text-3)",
                            }}
                          >
                            {t("public.global-labels.click-here")}
                          </Link>
                          .
                        </span>
                      )}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
            <Stack
              ml={{ xs: 0, sm: "132px" }}
              py={3}
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              spacing={{ xs: 1, sm: 4 }}
            >
              <Box>
                {isSmallerThanSm ? (
                  <Heading4 text={t("public.benefits-heat-pump.text1")} />
                ) : (
                  <Typography
                    variant="button"
                    sx={{ color: "var(--color-text-2)" }}
                  >
                    {t("public.benefits-heat-pump.text2")}
                    <br /> {t("public.benefits-heat-pump.text3")}
                    <Icon
                      component={ArrowRightAltIcon}
                      pl={4}
                      fontSize="large"
                      sx={{
                        verticalAlign: "middle",
                        marginLeft: "1rem",
                      }}
                    />
                  </Typography>
                )}
              </Box>
              <ButtonDarkBlue
                text={t("public.global-labels.take-the-survey")}
                to="/public/survey"
              />
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default BenefitsHeatPumps;
