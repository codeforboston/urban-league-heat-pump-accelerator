import React from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Box,
  Grid,
  CardContent,
  CardActions,
  Card,
  Button,
  CardMedia,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";

const CardSection = styled("div")(({ theme }) => ({
  backgroundColor: "var(--bgColor-2)",
}));

// const CardSection = styled("div")(({ theme }) => ({
//   "& .image-wrapper": {

// }));
//   media: {
//     height: 0,
//     paddingTop: "56.25%", // 16:9
//   },
//   card: {
//     position: "relative",
//   },
//   overlay: {
//     position: "absolute",
//     top: "20px",
//     left: "20px",
//     color: "black",
//     backgroundColor: "white",
//   },
// };

const CardLinksSection = () => {
  return (
    <Grid
      container
      spacing={4}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardSection>
          <Box mx={6}>
            <CardActions>
              <Button
                component={Link}
                to="survey"
                size="large"
                endIcon={<EastIcon />}
              >
                Take The Survey
              </Button>
            </CardActions>

            <CardContent>
              <Typography variant="body2">
                Tell us your thoughts and questions about heat pumps
              </Typography>
            </CardContent>
          </Box>
        </CardSection>
      </Grid>

      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardSection>
          <Box mx={6}>
            <CardActions>
              <Button
                component={Link}
                to="about"
                size="large"
                endIcon={<EastIcon />}
              >
                Learn More About Us
              </Button>
            </CardActions>

            <CardContent>
              <Typography variant="body2">
                It’s our mission to bring heat pumps to Boston homes.
              </Typography>
            </CardContent>
          </Box>
        </CardSection>
      </Grid>
      {/*   
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card style={styles.card}>
          <CardMedia image={this.props.preview} className="styles-media" />
          <div style={styles.overlay}>this text should overlay the image</div>
        </Card>
      </Grid> */}
    </Grid>
  );
};

export default CardLinksSection;
