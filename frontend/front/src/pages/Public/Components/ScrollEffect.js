import React, { useEffect } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

function ScrollEffect() {
  const { scrollY } = useViewportScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const translateY = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    return () => {
      scrollY.clearListeners();
    };
  }, [scrollY]);

  return (
    <motion.div
      style={{
        opacity,
        y: translateY,
      }}
    >
      {/* Conteúdo do seu aplicativo */}
    </motion.div>
  );
}

export default ScrollEffect;
