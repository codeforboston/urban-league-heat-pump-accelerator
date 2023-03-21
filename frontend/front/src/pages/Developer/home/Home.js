import React, { useEffect } from "react";
import { Typography, Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import LinkButton from "./LinkButton";

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
          <LinkButton to="confirmation" text="Confirm Modal" />
          <LinkButton to="rtkq" text="React Tool Kit Querey Example" />
          <LinkButton to="map" text="Google Map with API key" />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
