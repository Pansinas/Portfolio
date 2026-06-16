import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') !== null || e.target.closest('button') !== null || e.target.style.cursor === 'pointer') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const springX = useSpring(mousePosition.x - 16, { stiffness: 500, damping: 28 });
  const springY = useSpring(mousePosition.y - 16, { stiffness: 500, damping: 28 });

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid var(--primary)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: springX,
          y: springY,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
          transition: 'scale 0.2s ease, background-color 0.2s ease',
          boxShadow: isHovering ? '0 0 20px var(--primary-glow)' : 'none'
        }}
      />
      <div 
        style={{
          position: 'fixed',
          top: mousePosition.y - 4,
          left: mousePosition.x - 4,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--text-main)',
          pointerEvents: 'none',
          zIndex: 10000,
          opacity: isHovering ? 0 : 1,
          transition: 'opacity 0.2s'
        }}
      />
    </>
  );
};

export default CustomCursor;
