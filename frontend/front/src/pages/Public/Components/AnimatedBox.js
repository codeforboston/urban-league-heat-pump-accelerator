import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledMotionDiv = styled(motion.div)(({ theme }) => ({
  "& .motion-div": {
    opacity: 0,
    scale: 0.95,
  },
  "& .motion-div.visible": {
    opacity: 1,
    scale: 1,
    transition:
      "opacity 0.8s ease-in-out, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
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
      scale: 1,
    },
    hidden: {
      opacity: 0,
      scale: 0.95,
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
