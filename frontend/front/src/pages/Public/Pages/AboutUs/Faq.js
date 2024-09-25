import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
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

const Faq = () => {
  const { t } = useTranslation();

  const faqContent = [
    {
      heading: t("public.faq.items.item1.title"),
      content: t("public.faq.items.item1.text"),
    },
    {
      heading: t("public.faq.items.item2.title"),
      content: t("public.faq.items.item2.text"),
    },
    {
      heading: t("public.faq.items.item3.title"),
      content: t("public.faq.items.item3.text"),
    },
    {
      heading: t("public.faq.items.item4.title"),
      content: t("public.faq.items.item4.text"),
    },
    {
      heading: t("public.faq.items.item5.title"),
      content: t("public.faq.items.item5.text"),
    },
    {
      heading: t("public.faq.items.item6.title"),
      content: t("public.faq.items.item6.text"),
    },
    {
      heading: t("public.faq.items.item7.title"),
      content: t("public.faq.items.item7.text"),
    },
    {
      heading: t("public.faq.items.item8.title"),
      content: t("public.faq.items.item8.text"),
    },
    {
      heading: t("public.faq.items.item9.title"),
      content: t("public.faq.items.item9.text"),
    },
  ];

  return (
    <Box>
      {faqContent.map(({ heading, content }, index) => (
        <Accordion key={`faq-${index}`}>
          <AccordionSummary
            aria-controls={`faq-content-${index + 1}`}
            id={`faq-panel-${index + 1}`}
          >
            <Typography variant="h6" sx={{ color: "var(--color-text-2)" }}>
              {heading}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Faq;
