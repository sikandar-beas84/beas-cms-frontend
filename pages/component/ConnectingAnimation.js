import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
const ConnectingAnimation = () => {
  // Hook to get scroll position
  const { scrollYProgress } = useScroll();

  // Transform scroll position to animate lines and nodes
  const lineOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]); // Line fades in and stays visible
  const nodeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1]); // Nodes grow from small to full size

  return (
    <div style={{ position: 'relative', height: '200vh', padding: '2rem' }}>
      {/* Parent Container */}
      <div style={{ position: 'sticky', top: '20vh', left: '50%', width: '100%', height: '80vh' }}>
        {/* Line connecting the nodes */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '4px',
            height: '60%',
            backgroundColor: '#3498db',
            transformOrigin: 'top',
            opacity: lineOpacity, // Animate line opacity
            transform: 'translateX(-50%)',
          }}
        />

        {/* First Node */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            width: '30px',
            height: '30px',
            backgroundColor: '#e74c3c',
            borderRadius: '50%',
            transform: 'translateX(-50%)',
            scale: nodeScale, // Animate node scale
          }}
        >
          {/* Node Label */}
          <motion.span
            style={{
              position: 'absolute',
              top: '35px',
              left: '-15px',
              color: '#333',
              fontSize: '12px',
            }}
          >
            Person A
          </motion.span>
        </motion.div>

        {/* Second Node */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '60%',
            width: '30px',
            height: '30px',
            backgroundColor: '#2ecc71',
            borderRadius: '50%',
            scale: nodeScale, // Animate node scale
          }}
        >
          {/* Node Label */}
          <motion.span
            style={{
              position: 'absolute',
              top: '35px',
              left: '-15px',
              color: '#333',
              fontSize: '12px',
            }}
          >
            Person B
          </motion.span>
        </motion.div>

        {/* Third Node */}
        <motion.div
          style={{
            position: 'absolute',
            top: '70%',
            left: '40%',
            width: '30px',
            height: '30px',
            backgroundColor: '#f39c12',
            borderRadius: '50%',
            scale: nodeScale, // Animate node scale
          }}
        >
          {/* Node Label */}
          <motion.span
            style={{
              position: 'absolute',
              top: '35px',
              left: '-15px',
              color: '#333',
              fontSize: '12px',
            }}
          >
            Person C
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};
  export default ConnectingAnimation;






