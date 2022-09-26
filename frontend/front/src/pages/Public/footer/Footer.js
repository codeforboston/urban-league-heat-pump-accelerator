import { Grid, Typography, Link } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Grid container p={6} sx={{ bgcolor: "#1976d2", color: "#FFF" }}>
      <Grid item xs={12} md={4} display="flex" justifyContent="center">
        <Typography>ULEM</Typography>
      </Grid>
      <Grid item xs={12} md={4} display="flex" justifyContent="center">
        <Typography>Copyright 2022</Typography>
      </Grid>
      <Grid item xs={12} md={4} display="flex" justifyContent="center">
        <Link href="/public/" mr={2} sx={{ color: "#FFF" }}>
          Home
        </Link>
        <Link href="/public/about" mr={2} sx={{ color: "#FFF" }}>
          About
        </Link>
        <Link href="/public/contact" mr={2} sx={{ color: "#FFF" }}>
          Contact
        </Link>
      </Grid>
    </Grid>
  );
};

export default Footer;
