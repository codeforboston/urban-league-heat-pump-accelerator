import {
  Box,
  Card,
  CardActions,
  CardContent,
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
  link,
}) {
  const handleClick = () => {
    if (link) {
      const externalLink = document.createElement("a");
      externalLink.href = link;
      externalLink.target = "_blank";
      externalLink.rel = "noopener noreferrer";
      externalLink.click();
    } else {
      const pdfUrl = linkDownload;
      const downloadLink = document.createElement("a");
      downloadLink.href = pdfUrl;
      downloadLink.download = linkDescription;
      downloadLink.click();
    }
  };

  const renderMedia = () => {
    if (mediaType === "img") {
      return (
        <Box
          component="img"
          alt={title}
          src={mediaSource}
          sx={{
            backgroundSize: "contain",
            height: { xs: "200px", sm: "300px", md: "300px", lg: "300px" },
            minWidth: "500px",
            maxWidth: { xs: "353px", lg: "500px" },
          }}
        />
      );
    } else if (mediaType === "iframe") {
      return (
        <Box
          component="iframe"
          title={title}
          src={mediaSource}
          sx={{
            width: "100%",
            height: { xs: "200px", sm: "300px", md: "300px", lg: "300px" },
            border: "none",
            minWidth: "500px",
            maxWidth: { xs: "353px", lg: "500px" },
          }}
        />
      );
    } else {
      return null;
    }
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
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mr: { xs: 0, sm: 2 },
        }}
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
            onClick={handleClick}
          >
            {linkDescription}
          </Button>
        </CardActions>
      </Box>
      {renderMedia()}
    </Card>
  );
}

export default CardsSection;
