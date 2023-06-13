import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import Heading3 from "./Typography/Heading3";

function CardsSection({
  mediaType,
  mediaSource,
  title,
  body,
  linkDescription,
  linkDownload,
}) {

  const handleDownloadPDF = () => {
    const pdfUrl = linkDownload;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = linkDescription;
    link.click();
  };


  return (
    <Card
      sx={{
        display: "flex",
        background: "transparent",
        boxShadow: "none",
        flexDirection: { xs: "column-reverse", md: "row" },
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", mr: { xs: 0, sm: 2 } }}
      >
        <CardContent>
          <Box mb={2}>
            <Heading3 text={title} />
          </Box>

          <Typography variant="body">{body}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            size="large"
            sx={{
              color: "var(--color-text-2)",
              textDecoration: "solid underline 1px",
              textUnderlinePosition: "under",
              textDecorationColor: "var(--color-text-2)",
              textTransform: "none",
            }}
            onClick={handleDownloadPDF}
          >
            {linkDescription}
          </Button>
        </CardActions>
      </Box>
      <CardMedia
        component="img"
        alt={title}
        image={mediaSource}
        sx={{
          backgroundSize: "contain",
          maxHeight: "300px",
          minHeight: { xs: "198px", lg: "300px" },
          minWidth: "500px",
          maxWidth: { xs: "353px", lg: "500px" },
        }}
      />
    </Card>
  );
}

export default CardsSection;
