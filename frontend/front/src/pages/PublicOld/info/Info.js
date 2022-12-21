import React, { useEffect } from "react";
import { Typography, Box, Container, Grid, List, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../footer/Footer";

const Info = () => {
    const greyBG = grey[200];
    return (
        
        <Container>
            <Box m={3} p={3}>
                <Typography variant='h2'>What are heat pumps?</Typography>
            </Box>
                {/* What are heating pumps */}
            <Grid container my={15}>
                <Grid
                    item
                    xs={12}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Typography variant="h4">What are heating pumps?</Typography>
                    <Typography variant="subtitle1">
                    This paragraph will exp;ain what are heating pumps. This should be
                    informational so that the customer has a good understanding of
                    what it is and its purpose. This paragraph will exp;ain what are
                    heating pumps. This should be informational so that the customer
                    has a good understanding of what it is and its purpose.
                    </Typography>
                </Grid>
            </Grid>
            <Grid container my={5} py={6} px={3} bgcolor={greyBG}>
                <Grid item xs={12} md={9} display="flex" flexDirection="column">
                    <Typography variant="h4" mb={2}>
                        Are you ready to take advantage of this benefit?
                    </Typography>
                </Grid>
            <Grid item xs={12} md={3} display="flex" justifyContent="center">
                <Button variant="contained" mt={2}>
                    Sign Up
                </Button>
            </Grid>
            </Grid>
        </Container>

    );

};

export default Info;
