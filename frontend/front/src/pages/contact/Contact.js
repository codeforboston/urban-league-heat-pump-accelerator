import React from "react";
import { Typography, Box, Grid, Link } from "@mui/material";
import { useSelector } from "react-redux";

const Contact = () => {

  const title = useSelector((state) => state.contact.title);
  const Ulem = useSelector((state) => state.contact.Ulem);
  const Cfb = useSelector((state) => state.contact.Cfb);
  
  console.log(title)
  
  return (
    <Box>
      <Box p={1} m={1}>
        <Typography 
        variant='h2'
        display='flex'r
        justifyContent='center'
        alignItems='center'
        >{title} Us!
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
          <Typography 
          variant='h5'
          >{Ulem.name}
          </Typography>
            
            <Box mt={5}>
              Phone: {Ulem.phone}
            </Box>
            <Box mt={5}>
              Email: {Ulem.email}

            </Box>
            <Link 
            mt={5} 
            href= {Ulem.website}
            color="inherit"
            underline="hover"
            target="_blank"
            rel="noopener"
            >
              Website
            </Link>
            <Box mt={5}>
              Address: {Ulem.address}
            </Box>
          </Box>
        </Grid>
      <Grid
          item
          xs={12}
          md={6}
          mt={5}
          pb={5}
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
          <Typography 
          variant='h5'
          >{Cfb.name}
          </Typography>
            <Box mt={5}>
              Phone: {Cfb.phone}
            </Box>
            <Box mt={5}>
              Email: {Cfb.email}

            </Box>
            <Link 
            mt={5} 
            href= {Cfb.website}
            color="inherit"
            underline="hover"
            target="_blank"
            rel="noopener"
            >
              Website
            </Link>
            <Box mt={5}>
              Address: {Cfb.address}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;