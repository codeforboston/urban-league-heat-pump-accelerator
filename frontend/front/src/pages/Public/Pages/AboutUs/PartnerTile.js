import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import cfa from "../../../../assets/images/partnersLogo/CFA.png";
import cfb from "../../../../assets/images/partnersLogo/CFB.png";
import heatsmart from "../../../../assets/images/partnersLogo/HeatSmart.png";
import mcec from "../../../../assets/images/partnersLogo/MACleanEnergy.png";
import moc from "../../../../assets/images/partnersLogo/moc.png";
import pcb from "../../../../assets/images/partnersLogo/powercorp-boston.jpeg";

const PartnerTile = () => {
  const { t } = useTranslation();

  const partners = [
    {
      initialText: "The ",
      partnerName: "Massachusetts Clean Energy Center (MassCEC)",
      text: ` is a quasi-public state economic development agency dedicated to accelerating the growth of the clean energy sector across the Commonwealth, to spur job creation, deliver statewide environmental benefits, and to secure long-term economic growth for the people of Massachusetts. MassCEC provided primary funding to the BHPA project via the EmPower grant program.`,
      image: mcec,
      website: "https://www.masscec.com/",
      textTranslationKey: t("public.about-us.mcec"),
    },
    {
      initialText: "",
      partnerName: "Code For Boston (CFB)",
      text: "is a volunteer civic technology and social change organization. CfB is made up of developers, designers, data geeks, citizen activists, and many others who use creative technology to solve civic and social problems. CfB staff and volunteers provided core elements of the BHPA project.",
      image: cfb,
      website: "https://www.codeforboston.org/",
      textTranslationKey: t("public.about-us.cfb"),
    },
    {
      initialText: "",
      partnerName: "Code For America (CFA)",
      text: "is a 501(c)(3) nonprofit founded in 2009 to improve government services for all, starting with those who need them most. The CfA Brigade Network provided in-kind staff support to the BHPA project via the 2022 Impact Sprints program.",
      image: cfa,
      website: "https://codeforamerica.org/",
      textTranslationKey: t("public.about-us.cfa"),
    },
    {
      initialText: "The ",
      partnerName: "HeatSmart Alliance",
      text: "is a volunteer group that promotes adoption of low-emissions heating, cooling, and related technologies in local communities. The Alliance staff provided technical expertise and guidance to the BHPA project.",
      image: heatsmart,
      website: "https://heatsmartalliance.org/",
      textTranslationKey: t("public.about-us.heat-smart"),
    },
    {
      initialText: "",
      partnerName: "City of Boston - PowerCorpsBOS (PCB)",
      text: "is a green jobs program that provides young adults with training, career readiness support, and connections to employers in the green industry. PCB provided support to the BHPA surveying effort.",
      image: pcb,
      website:
        "https://www.boston.gov/departments/workforce-development/powercorpsbos",
      textTranslationKey: t("public.about-us.pcb"),
    },
    {
      initialText: "",
      partnerName: "Mass Open Cloud (MOC)",
      text: "is a laboratory for cloud research and innovation. Since its creation in 2013, with support from the Mass Tech Collaborative, it has provided a production cloud that has enabled innovation by a broad community of industry and research partners, used by thousands of students and researchers, and supported tens of millions of dollars in associated research grants that have resulted in contributions to open source software and hundreds of publications.",
      image: moc,
      website: "https://massopen.cloud/",
      textTranslationKey: t("public.about-us.moc"),
    },
  ];

  return (
    <>
      <Box>
        {partners.map(
          (
            {
              initialText,
              partnerName,
              text,
              image,
              website,
              textTranslationKey,
            },
            index,
            array
          ) => (
            <Box key={`partner-${index}`}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "center", md: "flex-start" }}
              >
                <Link href={website} target="_blank" rel="noopener">
                  <Box
                    component="img"
                    src={image}
                    target="_blank"
                    rel="noopener noreferrer"
                    width={220}
                    mr={{ xs: 0, md: 2 }}
                    mb={{ xs: 2, md: 0 }}
                  />
                </Link>
                <Box>
                  <Typography variant="body">
                    <Trans
                      i18nKey={textTranslationKey}
                      default="{initialText} <0>{{partnerName}}</0> {{text}}"
                      values={{
                        initialText: initialText,
                        partnerName: partnerName,
                        text: text,
                      }}
                      components={[
                        <Link
                          href={website}
                          target="_blank"
                          rel="noopener"
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            fontWeight: "bold",
                          }}
                        >
                          {partnerName}
                        </Link>,
                      ]}
                    ></Trans>
                  </Typography>
                </Box>
              </Stack>
              {index !== array.length - 1 && (
                <Divider sx={{ width: "100%", my: 3 }} />
              )}
            </Box>
          )
        )}
      </Box>
    </>
  );
};

export default PartnerTile;
