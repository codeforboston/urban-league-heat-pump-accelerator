import React from "react";
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
import Heading1 from "../Components/Typography/Heading1";
import Heading3 from "../Components/Typography/Heading3";
import Heading4 from "../Components/Typography/Heading4";
import moneyIcon from "../../../assets/images/Icons/money.png";
import snowSunIcon from "../../../assets/images/Icons/snow-sun.png";
import communityIcon from "../../../assets/images/Icons/community.png";
import heatIcon from "../../../assets/images/Icons/heat.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ButtonDarkBlue from "../Components/Button/ButtonDarkBlue";

const cardBenefits = [
  {
    icon: moneyIcon,
    title: "Saving Money",
    body: "Air source heat pumps (ASHPs) can reduce electricity usage for heating by up to 50% compared to electrical furnaces and baseboard heaters. (Environmental Protection Agency - link). For cooling, ASHPs are roughly equivalent to “central air conditioning” and far more efficient than window AC units.Together, this can translate into homeowner savings of 20%-40% off of their annual heating and cooling bills. To compare your system and to see how much you could save, ",
    link: "https://www.masssave.com/residential/heating-comparison-calculator",
  },
  {
    icon: snowSunIcon,
    title: "Improved Heating & Cooling",
    body: "Heat pumps are an excellent way to heat and cool your home. They’re nearly silent, draw less electricity, and they are continuous: heat pumps’ continuous, low-level operation provides constant heating or cooling, eliminating the blasts of hot or cold that legacy systems usually create. To learn more about ASHP operation and benefits, ",
    link: "https://goclean.masscec.com/clean-energy-solutions/air-source-heat-pumps",
  },
  {
    icon: communityIcon,
    title: "Strengthening Community",
    body: "Boston residents want to stay in their homes and keep their communities strong, even while facing challenges from rising costs. Switching to heat pumps can lower utility costs, reducing the financial challenge of staying in the community. By also adding active cooling capacity, ASHPs also improve the “housing resiliency” of entire neighborhoods as annual temperatures rise. With both energy bills and temperatures on the rise, housing resiliency is more important than ever to empower communities to stay strong and stay together. To learn more, ",
    link: "https://www.energy.gov/policy/articles/heat-pumps-keep-homes-warm-and-bills-low-winter",
  },
  {
    icon: heatIcon,
    title: "Reducing Carbon Emissions",
    body: "Heat pumps are highly efficient heating and cooling systems that are electrically-powered. As such, they become “cleaner” whenever the source of their electric power becomes cleaner. Gas or oil fueled heating/cooling cannot benefit in the same way. How much of a difference will switching to ASHPs make in your case? Find specifics on the climate impact of a switch to heat pumps, ",
    link: "https://goclean.masscec.com/clean-energy-solutions/",
  },
];

const BenefitsHeatPumps = () => {
  const theme = useTheme();
  const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerThanSmm = useMediaQuery(theme.breakpoints.down("smm"));

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
      <Heading1BlueBgGround text="Benefits of Heat Pumps" />
      <Container sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Stack direction="column">
          <Box mb={{ xs: 1, sm: 6 }} mt={{ xs: 1, sm: 2 }}>
            {isSmallerThanSmm ? (
              <Heading1
                fontWeight="500"
                text="Discover the benefits of switching to a heat pump"
              />
            ) : (
              <>
                <Heading1 fontWeight="500" text="Discover the benefits of  " />
                <Heading1 fontWeight="500" text="switching to a heat pump" />
              </>
            )}
          </Box>
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
                      {card.link !== "" && (
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
                          click here.
                        </Link>
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
                  <Heading4 text=" We want to hear your opinions!" />
                ) : (
                  <Typography
                    variant="button"
                    sx={{ color: "var(--color-text-2)" }}
                  >
                    We want to hear your <br /> opinions!
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
              <ButtonDarkBlue text="Take the survey" to="/public/survey" />
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default BenefitsHeatPumps;
