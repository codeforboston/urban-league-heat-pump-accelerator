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
              <Item>
                <Heading1 text={t("public-home.testimonials.heading1")} />
              </Item>
            </Grid>
            {isSmallerThanMd && (
              <Grid item xs={12} direction="column">
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
            <Grid item md={8} direction="column">
              <Item style={{ flexGrow: 1 }}>
                <Typography variant="h4" px={{ xs: 0, md: 6 }}>
                  {t("public-home.testimonials.text1")}
                </Typography>
                <Box pt={3}>
                  <Heading4 text="Nia, Mattapan Resident" />
                </Box>
                <Typography py={6} variant="h6" sx={{ fontWeight: 400 }} px={1}>
                  {t("public-home.testimonials.text2")}
                </Typography>
                <Box>
                  <ButtonDarkBklue
                    text="read more"
                    to="https://goclean.masscec.com/customer-story/peter-installs-an-air-source-heat-pump-system/?utm_medium=cpc&utm_source=google&utm_campaign=brand"
                    externalLink={true}
                  />
                </Box>
              </Item>
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
