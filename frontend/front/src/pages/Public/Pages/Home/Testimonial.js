import React from "react";
import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/material/styles";
import { Typography, Paper, Avatar, Box } from "@mui/material";

const items = [
  {
    name: "John Doe",
    text: "This product has changed my life. It's so easy to use and has made things so much more convenient.",
    avatarSrc:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&w=400&h=400&q=60",
  },
  {
    name: "Jane Doe",
    text: "I love this product. It's saved me so much time and hassle. I highly recommend it!",
    avatarSrc:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=60",
  },
  {
    name: "Jim Smith",
    text: "This is a game-changer. I can't imagine going back to my old ways. Thank you for this product!",
    avatarSrc:
      "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?auto=format&fit=crop&w=400&h=400&q=60",
  },
];

function Testimonial() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "500px",
          minWidth: "200px",
          width: "100%",
        }}
      >
        <Typography gutterBottom variant="h4" mb={6} align="center">
          Testimonials
        </Typography>
        <Carousel animation="slide">
          {items.map((item, i) => (
            <TestimonialItem key={i} item={item} />
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}

function TestimonialItem(props) {
  return (
    <Paper
      sx={{
        padding: 4,
        margin: "0 auto",

        background: "var(--bgColor-8)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContet: "center",
          alignItems: "center",
          color: "var(--color-text-1)",
        }}
      >
        <Avatar src={props.item.avatarSrc} sx={{ width: 56, height: 56 }} />
        <Typography variant="h5"> {props.item.name}</Typography>
        <Typography variant="body1" textAlign="center">
          "{props.item.text}"
        </Typography>
      </Box>
    </Paper>
  );
}

export default Testimonial;
