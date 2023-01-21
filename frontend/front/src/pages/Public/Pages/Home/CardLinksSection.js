import React from "react";
import {
  Typography,
  Box,
  Grid,
  CardContent,
  CardActions,
  Card,
  Button,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";

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
        <Card>
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
        </Card>
      </Grid>

      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card>
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
        </Card>
      </Grid>
    </Grid>
  );
};

export default CardLinksSection;
