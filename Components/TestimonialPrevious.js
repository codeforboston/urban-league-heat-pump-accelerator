import React from "react";
import Carousel from "react-material-ui-carousel";
import { Typography, Avatar, Box } from "@mui/material";
import nia from "../../../../assets/images/testimonials/nia.png";

const items = [
  {
    name: "Nia",
    subtitle: "New Floor Mounted Air-Source Heat Pump",
    text: `Mattapan resident Nia has cut her average electric bill in half since replacing her electric baseboards and window air-conditioners with air-source heat pumps. She says, 
    “Wow, it blew my mind. Normally the bill is anywhere from $400 to $500, and it was more like $200. I was like, let me look at that again!”`,
    avatarSrc: nia,
  },
  {
    name: "Jane Doe",
    subtitle: "Vice Chairman, ACME Corp.",
    text: "I love this product. It's saved me so much time and hassle. I highly recommend it!",
    avatarSrc:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=60",
  },
  {
    name: "Jim Smith",
    subtitle: "President, Foo Bars Inc.",
    text: "This is a game-changer. I can't imagine going back to my old ways. Thank you for this product!",
    avatarSrc:
      "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?auto=format&fit=crop&w=400&h=400&q=60",
  },
];

function Testimonial() {
  return (
    <Box
      pb={8}
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
        <Box sx={{ display: { xs: "block", lg: "none" } }}>
          <Carousel animation="slide" maxHeight="580px">
            {items.map((item, i) => (
              <TestimonialItem key={i} item={item} />
            ))}
          </Carousel>
        </Box>
        <Box
          animation="slide"
          height="380px"
          sx={{
            display: { xs: "none", lg: "flex" },
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {items.map((item, i) => (
            <TestimonialItem key={i} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function TestimonialItem(props) {
  return (
    <Box>
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
          p: 3,
          background: "var(--bgColor-3)",
          borderRadius: "10px",
          boxShadow: "var(--boxShadow-3)",
          color: "var(--color-text-2)",
          margin: "0 16px",
          height: "auto",
          border: "var(--boder-color-1)",
          maxWidth: { lg: "500px" },
          minWidth: { lg: "310px" },
        }}
      >
        <Typography variant="h6" mt={8}>
          {props.item.name}
        </Typography>
        <Typography variant="subtitle1">{props.item.subtitle}</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body1"
            textAlign="center"
            sx={{
              color: "var(--color-text-3)",
              height: { xs: "100%", sm: "180px" },
              display: "flex",
            }}
          >
            {props.item.text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Testimonial;
