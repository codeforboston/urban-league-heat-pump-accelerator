import React from "react";
import Carousel from "react-material-ui-carousel";
import { Typography, Avatar, Box } from "@mui/material";
import AnimatedBox from "../../Components/AnimatedBox";

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
      mb={16}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <Carousel animation="slide" height="380px">
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
    <>
      <AnimatedBox>
        <Avatar
          src={props.item.avatarSrc}
          sx={{
            width: "112px",
            height: "112px",
            margin: "0 auto",
            top: "67px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "15px",
            background: "var(--bgColor-10)",
            borderRadius: "10px",
            boxShadow: "var(--boxShadow-3)",
            color: "var(--color-text-1)",
            margin: "0 16px",
            height: "220px",
          }}
        >
          <Typography variant="h6" mt={8}>
            {props.item.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography
              variant="body1"
              textAlign="center"
              sx={{ color: "var(--color-text-3)", mb: 3 }}
            >
              "{props.item.text}"
            </Typography>
          </Box>
        </Box>
      </AnimatedBox>
    </>
  );
}

export default Testimonial;
