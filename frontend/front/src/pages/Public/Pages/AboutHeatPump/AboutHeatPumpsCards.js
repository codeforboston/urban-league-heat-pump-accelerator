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

// const CardTitle = styled(Typography)(({ theme }) => ({
//   [theme.breakpoints.down("lg")]: {
//     fontSize: "1.25rem",
//   },
//   [theme.breakpoints.up("lg")]: {
//     fontSize: "2.875rem",
//   },
//   fontFamily: "var(--font-family-1)",
//   fontWeight: 500,
//   color: "var(--bgColor-2)",
//   marginTop: "10px",
// }));

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
        flexDirection: { xs: "column", lg: "row" },
        alignItems: "center",
        gap: { lg: "60px" },
      }}
    >
      <Box
        sx={{
          height: { xs: "198px", lg: "367px" },
          width: { xs: "353px", lg: "654px" },
          order: { lg: "2" },
        }}
      >
        <CardMedia
          component={mediaType}
          height="100%"
          width="100%"
          src={mediaSource}
        />
      </Box>
      <Box sx={{ maxWidth: { lg: "586px" }, maxHeight: "auto" }}>
        <CardContent sx={{ padding: 0 }}>
          <Heading3 text={title} />

          <Typography mt={2} variant="body1">
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
              {linkDescription.toUpperCase()}
            </Link>
          </CardActions>
        )}
      </Box>
    </Card>
  );
}

export default AboutHeatPumpCards;
