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
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        gap: { sm: 5, lg: 10 },
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          //backgroundSize: "contain",
          //maxHeight: { xs: "198px", lg: "300px" },
          //minHeight: { xs: "198px", lg: "300px" },
          //
          //minWidth: { xs: "353px", lg: "500px" },
          //maxWidth: { xs: "353px", lg: "500px" },

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
