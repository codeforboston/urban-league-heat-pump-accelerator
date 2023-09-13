import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import Heading3 from "../../Components/Typography/Heading3";

function AboutHeatPumpCards({
  mediaType,
  mediaSource,
  title,
  body,
  link,
  linkDescription,
}) {
  return (
    <Card
      sx={{
        boxShadow: 0,
        borderRadius: "0px",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        gap: { sm: 5, lg: 10 },
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          order: { sm: "2" },
        }}
      >
        <CardMedia
          component={mediaType}
          src={mediaSource}
          sx={{
            backgroundSize: "contain",
            backgroundColor: "transparent",
            maxHeight: { xs: "198px", lg: "300px" },
            minHeight: { xs: "198px", lg: "300px" },
            minWidth: { xs: "353px", lg: "500px" },
            maxWidth: { xs: "353px", lg: "500px" },
            borderWidth: "0px",
          }}
        />
      </Box>
      <Box>
        <CardContent sx={{ mt: "10px", padding: 0 }}>
          <Heading3 text={title} />
          <Typography mt={2} variant="body">
            {body}
          </Typography>
        </CardContent>
        {link && (
          <CardActions
            sx={{
              padding: "0px",
              marginTop: { xs: "10px", lg: "20px" },
              justifyContent: "end",
            }}
          >
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              variant="button"
              sx={{
                color: "var(--color-text-2)",
              }}
            >
              {linkDescription}
            </Link>
          </CardActions>
        )}
      </Box>
    </Card>
  );
}

export default AboutHeatPumpCards;
