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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minWidth: { xs: "353px", smm: "425px", sm: "500px" },
            maxWidth: { xs: "353px", smm: "425px", sm: "500px" },
            height: { xs: "198px", smm: "239px", sm: "281px" }, // 16:9 ratio
          }}
        />
      );
    } else if (mediaType === "iframe") {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minWidth: { xs: "353px", smm: "425px", sm: "500px" },
            maxWidth: { xs: "353px", smm: "425px", sm: "500px" },
            height: { xs: "198px", smm: "239px", sm: "281px" }, // 16:9 ratio
          }}
        >
          <Box
            component="iframe"
            title={title}
            src={mediaSource}
            sx={{
              width: "100%",
              minWidth: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </Box>
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
          width: "100%",
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
        {linkDescription !== "" && (
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
        )}
      </Box>
      {renderMedia()}
    </Card>
  );
}

export default CardsSection;
