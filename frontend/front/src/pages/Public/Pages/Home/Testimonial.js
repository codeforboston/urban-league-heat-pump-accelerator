import React from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Box,
  Grid,
  Paper,
  Container,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Heading1 from "../../Components/Typography/Heading1";
import Heading4 from "../../Components/Typography/Heading4";
import nia from "../../../../assets/images/testimonials/nia2.png";
import niaAvatar from "../../../../assets/images/testimonials/nia.png";
import ButtonDarkBklue from "../../Components/Button/ButtonDarkBlue";
import AnimatedBox from "../../Components/AnimatedBox";

const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
}));

const Testimonial = () => {
  const theme = useTheme();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));

  const { t } = useTranslation();

  return (
    <AnimatedBox triggerOnce={false}>
      <Container>
        <Paper
          sx={{ padding: { xs: "0" }, background: "var(--bgColor-1)" }}
          elevation={0}
        >
          <Grid
            container
            sx={{ height: "100%" }}
            direction={{ xs: "reverse-column", md: "row" }}
          >
            <Grid item xs={12}>
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Heading1 text={t("public.home.testimonials.heading1")} />
              </Box>
            </Grid>
            {isSmallerThanMd && (
              <Grid item xs={12}>
                <Item sx={{ paddingBottom: 0 }}>
                  <Avatar
                    src={niaAvatar}
                    sx={{
                      width: "112px",
                      height: "112px",
                      margin: "0 auto",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </Item>
              </Grid>
            )}
            <Grid item md={8}>
              <Box sx={{ flexGrow: 1, px: 2, textAlign: "center", pt: 3 }}>
                <Typography variant="h4" px={{ xs: 0, md: 6 }}>
                  {t("public.home.testimonials.text1")}
                </Typography>
                <Box pt={3}>
                  <Heading4
                    text={`Nia, Mattapan ${t(
                      "public.home.testimonials.text3"
                    )}`}
                  />
                </Box>
                <Typography py={6} variant="h6" sx={{ fontWeight: 400 }}>
                  {t("public.home.testimonials.text2")}
                </Typography>
                <Box>
                  <ButtonDarkBklue
                    text={t("public.home.testimonials.button")}
                    to="https://goclean.masscec.com/customer-story/ashp-nias-new-floor-mounted-air-source-heat-pump/"
                    externalLink={true}
                  />
                </Box>
              </Box>
            </Grid>
            {!isSmallerThanMd && (
              <Grid item md={4}>
                <Item>
                  <Box
                    component="img"
                    sx={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      borderRadius: "2px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                    }}
                    src={nia}
                    alt={nia}
                  />
                </Item>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
    </AnimatedBox>
  );
};

export default Testimonial;
