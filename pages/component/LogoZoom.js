import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const LogoZoom = () => {
    const [scrollY, setScrollY] = useState(0);
    const controls = useAnimation();
  
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
    };
  
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    useEffect(() => {
        // Calculate scale
        const scale = scrollY > 700 ? Math.max(1, 1 + (scrollY - 100) * 0.06) : 1;
  
        // Apply scale with smooth transition
        controls.start({
            scale: scale,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 50,
            },
        });
    }, [scrollY, controls]);
  
    return (
        <motion.div
            animate={controls}
            style={{
                width: '30px',
                height: '30px',
                 backgroundColor: '#0081d2',
                margin: '0 auto 50px auto',
                position: 'relative',
                zIndex: '2',
                borderRadius:'8px 0 8px 0;',
            }}
        >
       
        </motion.div>
    );
}

export default LogoZoom;
