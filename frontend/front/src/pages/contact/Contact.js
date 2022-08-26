import React from "react";
import { Typography, Box, Grid, Link } from "@mui/material";
import { useSelector } from "react-redux";

const Contact = () => {
  return (
    <Box>
      <Box p={1} m={1}>
        <Typography
          variant='h2'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          Contact Us!
        </Typography>
      </Box>
      <Grid
        container
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Grid
          item
          xs={12}
          md={6}
          mt={5}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Typography variant='h5'>
              Urban League Eastern Massachusettes
            </Typography>

            <Box mt={5}>Phone: (617) 442-4519</Box>
            <Box mt={5}>Email: info@ulem.org</Box>
            <Link
              mt={5}
              href='https://www.ulem.org/'
              color='inherit'
              underline='hover'
              target='_blank'
              rel='noopener'
            >
              Website
            </Link>
            <Box mt={5}>Address: 88 Warren Street, Roxbury, MA 02119</Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          mt={5}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            variant='h2'
          >
            <Typography variant='h5'>Code for Boston</Typography>
            <Box mt={5}>Phone: N/A</Box>
            <Box mt={5}>Email: hello@codeforboston.org</Box>
            <Link
              mt={5}
              href='https://www.codeforboston.org/'
              color='inherit'
              underline='hover'
              target='_blank'
              rel='noopener'
            >
              Website
            </Link>
            <Box mt={5}>Address: 1 Broadway, Cambridge, MA 02142</Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
