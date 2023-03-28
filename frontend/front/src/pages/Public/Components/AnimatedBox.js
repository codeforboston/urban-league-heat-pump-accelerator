import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="motion-div"
    >
      {children}
    </motion.div>
  );
}

export default AnimatedBox;
