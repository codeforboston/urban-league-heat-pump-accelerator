import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { styled } from "@mui/material/styles";

const StyledMotionDiv = styled(motion.div)(({ theme }) => ({
  "& .motion-div": {
    opacity: 0,
    transform: "translateY(20px)",
  },
  "& .motion-div.visible": {
    opacity: 1,
    transform: "translateY(0)",
    transition: "all 0.5s ease-in-out",
  },
}));

function AnimatedBox({ triggerOnce = true, children }) {
  const [ref, inView] = useInView({
    threshold: 0.5, // When 50% of the element is visible in the viewport
    triggerOnce: triggerOnce, // if true, triggers the animation only once.
  });

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
    },
  };

  return (
    <StyledMotionDiv
      ref={ref}
      initial="hidden"
      // animate={inView ? "visible" : "hidden"}
      animate="visible"
      variants={variants}
      className="motion-div"
    >
      {children}
    </StyledMotionDiv>
  );
}

export default AnimatedBox;
