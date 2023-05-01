import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
  styled,
} from "@mui/material";
const CardTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    fontSize: "1.25rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "2.875rem",
  },
  fontFamily: "var(--font-family-1)",
  fontWeight: 500,
  color: "var(--bgColor-2)",
  marginTop: "10px",
}));

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
          <CardTitle variant="h4">{title}</CardTitle>
          <Typography
            sx={{
              color: "var(--colot-trext-6)",
              marginTop: "10px",
              fontSize: { lg: "1.875rem" },
              fontFamily: "var(--font-family-1)",
            }}
          >
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
              sx={{
                textDecoration: "none",
                fontSize: { xs: "0.75rem", lg: "1.875rem" },
                fontWeight: 700,
                color: "var(--bgColor-2)",
                fontFamily: "var(--font-family-1)",
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
