import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ScrollText = () => {
  // Animation controls
  const controls = useAnimation();
  
  // Set up the ref and inView hook from react-intersection-observer
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger when 20% of the element is visible
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  // Animation variants
  const variants = {
    hidden: { opacity: 0, scale: 0.2 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="scroll-text"
    >
     <h2 className="rbt-display-1 theme-gradient">Lorem Ipsum Dolor Sit</h2>
    </motion.div>
  );
};

export default ScrollText;
