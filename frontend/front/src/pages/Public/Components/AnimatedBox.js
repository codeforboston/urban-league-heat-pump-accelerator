import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { styled } from "@mui/material/styles";

const StyledMotionDiv = styled(motion.div)(({ theme }) => ({
  "& .motion-div": {
    opacity: 0,
  },
  "& .motion-div.visible": {
    opacity: 1,
    transition: "opacity 0.5s ease-in-out",
  },
}));

function AnimatedBox({ triggerOnce = true, children }) {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: triggerOnce,
  });

  const variants = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <StyledMotionDiv
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="motion-div"
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={variants}
          className="motion-div"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {child}
        </motion.div>
      ))}
    </StyledMotionDiv>
  );
}

export default AnimatedBox;
