import React, { useEffect } from "react";
import { Typography, Box, Container, Button, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Heatpump from "./Heatpump";
import RtkTesting from "../rtkDat/RtkTesting";
import { Link } from "react-router-dom";

// import { fetchHomeData } from "../../../features/home/homeSlice";

const Home = () => {
  const { title } = useSelector((state) => {
    console.log(state);
    return state.home;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchHomeData());
  }, [dispatch]);

  return (
    <Container>
      <Box>
        <Box
          p={3}
          m={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2">{title}</Typography>
        </Box>

        <Box display="flex">
          <Box m={3}>
            <Button color="inherit" component={Link} to="confirmation">
              <Box
                component={Paper}
                width={200}
                height={100}
                p={1}
                sx={{ bgcolor: "AliceBlue " }}
              >
                <Typography>Confirm Modal</Typography>
              </Box>
            </Button>
          </Box>
          <Box m={3}>
            <Button color="inherit" component={Link} to="rtkq">
              <Box
                component={Paper}
                width={200}
                height={100}
                p={1}
                sx={{ bgcolor: "AliceBlue " }}
              >
                <Typography>React Tool Kit Querey Example</Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
