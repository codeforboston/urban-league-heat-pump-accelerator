import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Box>
      <Link to=''>Home</Link>
      <Link to='testing1'>Testing1</Link>
      <Link to='testing2'>Testing2</Link>
    </Box>
  );
};

export default Nav;
