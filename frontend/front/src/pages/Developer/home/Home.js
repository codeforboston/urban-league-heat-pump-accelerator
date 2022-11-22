import React, { useEffect } from "react";
import { Typography, Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Heatpump from "./Heatpump";
import RtkTesting from "../rtkDat/RtkTesting";

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
        <RtkTesting />
      </Box>
    </Container>
  );
};

export default Home;
