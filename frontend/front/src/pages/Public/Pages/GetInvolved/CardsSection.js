import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import Heading3 from "../../Components/Typography/Heading3";

function CardsSection({
  mediaType,
  mediaSource,
  title,
  body,
  link,
  linkDescription,
}) {
  console.log(mediaSource);
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
          <Button href={link} size="large">
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
          //   maxHeight: { xs: "198px", lg: "300px" },
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
