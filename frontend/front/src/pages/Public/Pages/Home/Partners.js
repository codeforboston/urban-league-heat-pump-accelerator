import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import ulemLogo from "../../../../assets/images/ULEM.png";
import maCleanEnergyLogo from "../../../../assets/images/MACleanEnergy.png";
import heatSmartLogo from "../../../../assets/images/HeatSmart.png";
import codeForAmericaLogo from "../../../../assets/images/CFA.png";
import codeForBostonLogo from "../../../../assets/images/CFB.png";

const Partners = () => {
  let title = "Our Partners";
  const partners = [
    {
      id: 1,
      logo: ulemLogo,
      name: "Urban League of Eastern Massachusetts (ULEM)",
      link: "https://www.ulem.org/",
    },
    {
      id: 2,
      logo: maCleanEnergyLogo,
      name: "Massachusetts Clean Energy Center",
      link: "https://www.masscec.com/",
    },
    {
      id: 3,
      logo: heatSmartLogo,
      name: "HeatSmart Alliance",
      link: "https://heatsmartalliance.org/",
    },
    {
      id: 4,
      logo: codeForAmericaLogo,
      name: "Code For America",
      link: "https://codeforamerica.org/",
    },
    {
      id: 5,
      logo: codeForBostonLogo,
      name: "Code For Boston",
      link: "https://www.codeforboston.org/",
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="title1">{title}</Typography>
      </Box>
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="space-around"
      >
        {partners.map((partner) => (
          <Grid item key={partner.id}>
            <a href={partner.link} target="_blank" rel="noopener noreferrer">
              <Box
                component="img"
                sx={{
                  width: "150px",
                }}
                src={partner.logo}
                alt={partner.name}
              />
            </a>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Partners;
