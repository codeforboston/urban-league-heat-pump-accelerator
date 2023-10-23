import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { Box, Typography, Stack, Link, Container } from "@mui/material";
import PartnerTile from "./PartnerTile";
import ulem from "../../../../assets/images/partnersLogo/ULEM.png";
import Heading1BlueBgGround from "../../Components/Typography/Heading1BlueBgGround";

function AboutUs() {
  const { t } = useTranslation();

  return (
    <Box
      mb={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 520px)",
      }}
    >
      <Heading1BlueBgGround text={t("public.about-us.headingbg")} />
      <Container>
        <Stack direction="column" justifyContent="center" mb={3}>
          <Box mb={{ xs: 2, md: 6 }}>
            <Typography variant="body">
              <Trans i18nKey="public.about-us.bhpa">
                The <b>Boston Heat Pump Accelerator (BHPA)</b> works to support
                increased access for Boston homeowners to heat pumps and related
                resources, helping to reduce costs for residents, increase
                community resilience, and shift the region to low-carbon
                technologies. This initiative takes no funding from companies or
                heat pump installers - it supports overall access to heat pumps
                only, via education and awareness efforts.
              </Trans>
            </Typography>
          </Box>
          <Box>
            <Stack
              direction="row"
              alignItems={{ xs: "center", md: "flex-start" }}
              alignContent={"flex-start"}
              flexDirection={{ xs: "column", md: "row" }}
            >
              <Link href="https://www.ulem.org/" target="_blank" rel="noopener">
                <Box
                  component="img"
                  src={ulem}
                  width={220}
                  mr={{ xs: 0, md: 2 }}
                  mb={{ xs: 2, md: 0 }}
                />
              </Link>
              <Box>
                <Typography variant="body">
                  <Trans i18nKey="public.about-us.ulem1">
                    The
                    <Link
                      href="https://www.ulem.org/"
                      className="about-us-partners"
                      target="_blank"
                      rel="noopener"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        fontWeight: "bold",
                      }}
                    >
                      Urban League of Eastern Massachusetts (ULEM)
                    </Link>
                    is the sponsor of the BHPA effort. Since 1919, ULEM has
                    delivered workforce and economic development services and
                    programs to increase self-reliance of residents of the
                    Boston community and surrounding metropolitan areas. ULEM is
                    a 501c3 nonprofit organization and one of the oldest
                    affiliates within the National Urban League movement.
                  </Trans>
                </Typography>

                <Typography variant="body">
                  {t("public.about-us.ulem2")}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box textAlign="center" mt={6} mb={3}>
            <Typography variant="title4">
              {t("public.about-us.bhpa-core-partners")}
            </Typography>
          </Box>
          <PartnerTile />
        </Stack>
      </Container>
    </Box>
  );
}

export default AboutUs;
