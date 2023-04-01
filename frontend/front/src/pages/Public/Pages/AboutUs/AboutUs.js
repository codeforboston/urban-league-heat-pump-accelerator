import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import PartnerTile from "./PartnerTile";
import ulem from "../../../../assets/images/ULEM.png"
import mcec from "../../../../assets/images/MACleanEnergy.png"
import cfb from "../../../../assets/images/CFB.png"
import cfa from "../../../../assets/images/CFA.png"
import heatsmart from "../../../../assets/images/HeatSmart.png"
import pcb from "../../../../assets/images/powercorp-boston.jpeg"

function AboutUs() {
  return (
    <Container>
      <Grid
        item display="flex"
        flexDirection="column"
        alignItems="center"
        mr={4}
        ml={4}
        sx={{
          color: 'var(--color-text-1) !important'
        }}

      >
        <Typography
          variant="h4"
          mt={3}
          mb={3}
          textAlign="center"
          sx={{
            textDecoration: "underline #72bede",
          }}
        >
          About the Boston Heat Pump Accelerator
        </Typography>
        <Typography mb={3}>
          <b>The Boston Heat Pump Accelerator (BHPA)</b> works to support increased access for Boston homeowners to heat pumps and related resources, helping to reduce costs for residents, increase community resilience, and shift the region to low-carbon technologies. This initiative takes no funding from companies or heat pump installers - it supports overall access to heat pumps only, via education and awareness efforts.
        </Typography>
        <Typography mb={3}>
          <b>The Urban League of Eastern Massachusetts (ULEM)</b> is the sponsor of the BHPA effort. Since 1919, ULEM has delivered workforce and economic development services and programs to increase self-reliance of residents of the Boston community and surrounding metropolitan areas. ULEM is a 501c3 nonprofit organization and one of the oldest affiliates within the National Urban League movement.
        </Typography>
        <Typography>
          The BHPA project is directed by ULEM Board Member Christopher Scranton, in coordination with core partners, listed below.
        </Typography>
        <Box
          component="img"
          src={ulem}
          sx={{
            height: 100,
            "max-width": "90%",
            mt: 3,
            mb: 3,
          }}
        />
        <Typography
          variant="h4"
          mt={3}
          mb={3}
          textAlign="center"
          sx={{ textDecoration: "underline #72bede" }}
        >
          BHPA CORE PARTNERS
        </Typography>
        <PartnerTile
          partnerName="The Massachusetts Clean Energy Center (MassCEC)"
          paragraphText="is a quasi-public state economic development agency dedicated to accelerating the growth of the clean energy sector across the Commonwealth, to spur job creation, deliver statewide environmental benefits, and to secure long-term economic growth for the people of Massachusetts. MassCEC provided primary funding to the BHPA project via the EmPower grant program."
          image={mcec}
          website="https://www.ulem.org/"
        />
        <PartnerTile
          partnerName="Code For Boston (CfB)"
          paragraphText="is a volunteer civic technology and social change organization. CfB is made up of developers, designers, data geeks, citizen activists, and many others who use creative technology to solve civic and social problems. CfB staff and volunteers provided core elements of the BHPA project."
          image={cfb}
          website='https://www.codeforboston.org/'
        />
        <PartnerTile
          partnerName="Code For America (CfA)"
          paragraphText="is a 501(c)(3) nonprofit founded in 2009 to improve government services for all, starting with those who need them most. The CfA Brigade Network provided in-kind staff support to the BHPA project via the 2022 Impact Sprints program."
          image={cfa}
          website='https://codeforamerica.org/'
        />
        <PartnerTile
          partnerName="The HeatSmart Alliance"
          paragraphText="is a volunteer group that promotes adoption of low-emissions heating, cooling, and related technologies in local communities. The Alliance staff provided technical expertise and guidance to the BHPA project."
          image={heatsmart}
          website='https://heatsmartalliance.org/'
        />
        <PartnerTile
          partnerName="City of Boston - PowerCorpsBOS (PCB)"
          paragraphText="is a green jobs program that provides young adults with training, career readiness support, and connections to employers in the green industry. PCB provided support to the BHPA surveying effort."
          image={pcb}
          website='https://www.boston.gov/departments/workforce-development/powercorpsbos'
        />
      </Grid>
    </Container >
  );
}

export default AboutUs;
