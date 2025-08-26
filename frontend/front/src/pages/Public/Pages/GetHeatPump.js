import {
  Link,
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useTranslation, Trans } from "react-i18next";
import Heading1BlueBgGround from "../Components/Typography/Heading1BlueBgGround";
import Heading2 from "../Components/Typography/Heading2";
import ButtonDarkBlue from "../Components/Button/ButtonDarkBlue";
import { styled } from "@mui/material/styles";

const StyledSectionNumber = styled(Typography)(({ theme }) => ({
  fontFamily: "var(--font-family-1)",
  fontWeight: 700,
  color: "var(--bgColor-2)",
  [theme.breakpoints.up("xs")]: {
    fontSize: "4rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "9rem",
  },
}));

const GetHeatPump = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));

  const pageContent = [
    {
      step: "1",
      title: t("public.get-heat-pump.step1.title"),
      subtitle: "",
      description: [
        t("public.get-heat-pump.step1.itemA"),
        t("public.get-heat-pump.step1.itemB"),
        t("public.get-heat-pump.step1.itemC"),
        t("public.get-heat-pump.step1.itemD"),
        {
          text: "Estimate Your savings ",
          link: {
            text: "with this link calculator",
            url: "https://www.cenhud.com/en/my-energy/save-energy-money/energy-calculators/fuel-switching-calculator/",
          },
          textTranslationKey: t("public.get-heat-pump.step1.itemE"),
        },
      ],
      textButton: "",
      linkButton: "",
    },
    {
      step: "2",
      title: t("public.get-heat-pump.step2.title"),
      subtitle: t("public.get-heat-pump.step2.title2"),
      description: [],
      textButton: t("public.get-heat-pump.step2.buttonText"),
      linkButton: "https://heatsmartalliance.org/homeowners/request-coach/",
    },
    {
      step: "3",
      title: t("public.get-heat-pump.step3.title"),
      subtitle: "",
      description: [],
      textButton: t("public.get-heat-pump.step3.buttonText"),
      linkButton: "https://heatsmartalliance.org/resources/",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 520px)",
      }}
    >
      {/*Page Title */}
      <Heading1BlueBgGround text={t("public.get-heat-pump.headingBg")} />

      <Container sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Stack direction="column">
          <Box
            sx={{
              textAlign: { xs: "left", md: "center" },
              my: { xs: 2, md: 6 },
            }}
          >
            {/*SubTile */}
            <Heading2 text={t("public.get-heat-pump.heading2")} />
          </Box>
          <Typography mb={8} variant="h5">
            {t("public.get-heat-pump.subtitle")}
          </Typography>

          {/* Sections */}
          {pageContent.map((data) => (
            <Grid
              container
              spacing={6}
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: "325px" }}
              key={data.step}
            >
              {/* Steps Number */}
              {!isSmallerThanMd && (
                <Grid item>
                  <Avatar
                    variant="square"
                    sx={{
                      width: 128,
                      height: 128,
                      background: "transparent",
                    }}
                  >
                    <StyledSectionNumber>{data.step}</StyledSectionNumber>
                  </Avatar>
                </Grid>
              )}
              <Grid item sx={{ width: "681px" }}>
                {/* Title */}
                {isSmallerThanMd ? (
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      variant="square"
                      sx={{
                        height: "50px",
                        position: "relative",
                        background: "transparent",
                      }}
                    >
                      <StyledSectionNumber>{data.step}</StyledSectionNumber>
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 500 }}>
                      {data.title}{" "}
                      {data.subtitle && (
                        <Box
                          component="span"
                          sx={{ fontWeight: 400, verticalAlign: "middle" }}
                        >
                          {data.subtitle}
                        </Box>
                      )}
                    </Typography>
                  </Stack>
                ) : (
                  <Typography variant="h5" sx={{ fontWeight: 500 }}>
                    {data.title}{" "}
                    {data.subtitle && (
                      <Box
                        component="span"
                        sx={{ fontWeight: 400, verticalAlign: "middle" }}
                      >
                        {data.subtitle}
                      </Box>
                    )}
                  </Typography>
                )}

                {/* List */}
                {data.description && data.description.length > 0 && (
                  <Typography
                    variant="body"
                    sx={{
                      color: "#0A0B0B",
                      lineHeight: { xs: "40px", md: "40px" },
                    }}
                  >
                    <ol
                      style={{
                        margin: "0px",
                        paddingLeft: "75px",
                      }}
                    >
                      {data.description.map((item, index) => (
                        <li
                          key={index}
                          style={{ listStyleType: "lower-alpha" }}
                        >
                          {typeof item === "string" ? (
                            item
                          ) : (
                            <Trans
                              i18nKey={item.textTranslationKey}
                              default="{item.text} <0>{item.link.text}</0>"
                              components={[
                                <Link
                                  underline="none"
                                  href={item.link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  sx={{
                                    color: "inherit",
                                    textDecoration: "underline",
                                  }}
                                ></Link>,
                              ]}
                            ></Trans>
                          )}
                        </li>
                      ))}
                    </ol>
                  </Typography>
                )}
                {/* Button */}
                <Stack
                  mt={6}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  {data.textButton && (
                    <ButtonDarkBlue
                      text={data.textButton}
                      to={data.linkButton}
                      externalLink={true}
                    />
                  )}
                </Stack>
              </Grid>
            </Grid>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default GetHeatPump;
