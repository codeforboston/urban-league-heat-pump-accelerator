import { useTranslation, Trans } from "react-i18next";
import { styled } from "@mui/material/styles";
import { Container, Typography, Box } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Heading1BlueBgGround from "../../Components/Typography/Heading1BlueBgGround";
import Heading2 from "../../Components/Typography/Heading2";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: "2px solid var(--color-text-5)",
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

function PrivacyPolicy() {
  const { t } = useTranslation();

  const pageContent = [
    {
      heading: t("public.privacy.items.item1.title"),
      content: t("public.privacy.items.item1.text"),
    },
    {
      heading: t("public.privacy.items.item2.title"),
      content: t("public.privacy.items.item2.text"),
    },
    {
      heading: t("public.privacy.items.item3.title"),
      content: t("public.privacy.items.item3.text"),
    },
    {
      heading: t("public.privacy.items.item4.title"),
      content: t("public.privacy.items.item4.text"),
    },
    {
      heading: t("public.privacy.items.item5.title"),
      content: t("public.privacy.items.item5.text"),
    },
    {
      heading: t("public.privacy.items.item6.title"),
      content: t("public.privacy.items.item6.text"),
    },
    {
      heading: t("public.privacy.items.item7.title"),
      content: t("public.privacy.items.item7.text"),
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
      <Heading1BlueBgGround text={t("public.privacy.headingBg")} />

      <Container>
        <Typography>
          {t("public.privacy.textDate")} <br />
          <Trans
            i18nKey={t("public.privacy.text2")}
            values={{
              privacyPolicy: "Privacy Policy",
            }}
            components={[
              <span
                style={{
                  color: "var(--color-text-2)",
                  fontStyle: "italic",
                  textDecoration: "underline",
                }}
              >
                Privacy Policy
              </span>,
            ]}
          ></Trans>
        </Typography>
        <Typography py={3} variant="h6" sx={{ color: "var(--color-text-10)" }}>
          {t("public.privacy.text3")}
        </Typography>
        <section>
          <Heading2
            text={t("public.privacy.title1")}
            textDecoration="solid underline 2px"
          />
          <Box mb={6} mt={1}>
            {pageContent.map((c, i) => (
              <Accordion key={`privacy${i}`}>
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "var(--color-text-2)" }}
                  >
                    {c.heading}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body"
                    dangerouslySetInnerHTML={{ __html: c.content }}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </section>
      </Container>
    </Box>
  );
}

export default PrivacyPolicy;
