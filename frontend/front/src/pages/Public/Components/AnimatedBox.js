import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import clsx from "clsx";

const AnimatedBox = ({ animation, children, ...props }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 500);
  }, [isMounted]);

  const classes = clsx(animation, {
    animate__animated: isMounted,
  });

  return (
    <Box className={classes} {...props}>
      {children}
    </Box>
  );
};

export default AnimatedBox;
