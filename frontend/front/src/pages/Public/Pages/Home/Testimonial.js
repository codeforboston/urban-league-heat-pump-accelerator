import React from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Box,
  Grid,
  Paper,
  Container,
  CardMedia,
} from "@mui/material";
import Heading1 from "../../Components/Typography/Heading1";
import Heading4 from "../../Components/Typography/Heading4";
import nia from "../../../../assets/images/testimonials/nia2.png";
import ButtonDarkBklue from "../../Components/Button/ButtonDarkBlue";

const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  "&:hover img": {
    transform: "scale(1.1)",
  },
  "&:hover::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    boxShadow: `0 2px 8px ${theme.palette.grey[500]}`,
    opacity: 0.5,
  },
}));

const Testimonial = () => {
  return (
    <Container>
      <Paper
        sx={{ padding: { xs: "0" }, background: "var(--bgColor-1)" }}
        // variant="outlined"
        // square
        elevation={0}
      >
        <Grid
          container
          // spacing={2}
          sx={{ height: "100%" }}
          direction={{ xs: "reverse-column", md: "row" }}
        >
          <Grid item xs={12}>
            <Item>
              <Heading1 text="Testimonials" />
            </Item>
          </Grid>
          <Grid item md={8} direction="column">
            <Item style={{ flexGrow: 1 }}>
              <Typography variant="h4" px={{ xs: 0, md: 6 }}>
                “Wow, it blew my mind. Normally the bill is anywhere from $400
                to $500, and it was more like $200. I was like, let me look at
                that again!”
              </Typography>
              <Box pt={3}>
                <Heading4 text="Mattapan Resident, Nia" />
              </Box>
              <Typography py={6} variant="h6" sx={{ fontWeight: 400 }} px={1}>
                Hear what else people have to say about their heat pumps!
              </Typography>
              <Box>
                <ButtonDarkBklue text="read more" to="about-us" />
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Box
                component="img"
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderRadius: "2px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                }}
                src={nia}
                alt={nia}
              />
            </Item>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Testimonial;
