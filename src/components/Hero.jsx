import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Code, Cpu, Activity, Server, Brain } from 'lucide-react';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section id="hero" ref={ref} className="hero-section" style={{ 
      minHeight: '100vh', 
      display: 'grid', 
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', 
      gap: '60px', 
      alignItems: 'center',
      paddingTop: '120px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <motion.div style={{ position: 'relative', zIndex: 10, y: textY }}>
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, type: 'spring' }}
           style={{
             display: 'inline-block',
             color: 'var(--primary)',
             fontSize: '1rem',
             fontWeight: 700,
             letterSpacing: '2px',
             textTransform: 'uppercase',
             marginBottom: '20px',
             position: 'relative',
             paddingLeft: '60px'
           }}
        >
          <span style={{
            position: 'absolute', left: 0, top: '50%', width: '45px', height: '3px', background: 'var(--primary)',
            boxShadow: '0 0 10px var(--primary)'
          }}></span>
          Pansin A S
        </motion.div>
        
        <motion.h1
           initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
           animate={{ opacity: 1, scale: 1, rotateX: 0 }}
           transition={{ duration: 1, delay: 0.2, type: 'spring', bounce: 0.4 }}
           style={{
             fontSize: 'clamp(3rem, 6vw, 5rem)',
             lineHeight: 1.05,
             margin: '0 0 24px',
             fontWeight: 900,
             letterSpacing: '-2px',
             perspective: '1000px'
           }}
        >
          AI Specialist <br />
          <span className="gradient-text">& Tech Executive</span>
        </motion.h1>
        
        <motion.p
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
           style={{
             maxWidth: '580px',
             color: 'var(--text-muted)',
             fontSize: '1.35rem',
             margin: '0 0 40px',
             lineHeight: 1.6
           }}
        >
          CEO of Alphovins Global Agro Exports and an Artificial Intelligence & Data Science Engineer building predictive systems for the real world.
        </motion.p>
        
        <motion.div
           className="hero-buttons"
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           style={{ display: 'flex', gap: '20px' }}
        >
          <motion.a 
            href="#contact" 
            className="btn btn-primary"
            whileHover={{ scale: 1.1, boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: '16px 32px', fontSize: '1.1rem' }}
          >
            Hire Me
          </motion.a>
          <motion.a 
            href="https://linkedin.com/in/pansin-a-s-944a0b27b" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'var(--primary)' }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: '16px 32px', fontSize: '1.1rem' }}
          >
            LinkedIn
          </motion.a>
          <motion.a 
            href="/resume.pdf" 
            download
            className="btn btn-secondary"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'var(--primary)' }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: '16px 32px', fontSize: '1.1rem' }}
          >
            Download CV
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.3, type: 'spring', bounce: 0.3 }}
        style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <motion.div style={{
          width: '600px',
          height: '600px',
          background: 'var(--primary-glow)',
          filter: 'blur(150px)',
          position: 'absolute',
          borderRadius: '50%',
          opacity: 0.4,
          y: orbY,
          scale: orbScale,
          animation: 'pulse 8s infinite alternate'
        }} />

        {/* Floating Icons */}
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '10%', left: '5%', zIndex: 15, background: 'var(--glass-panel)', padding: '15px', borderRadius: '50%', border: '1px solid var(--border-light)' }}
        >
          <Brain color="var(--primary)" size={32} />
        </motion.div>
        
        <motion.div
          animate={{ y: [15, -15, 15], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ position: 'absolute', bottom: '20%', right: '0%', zIndex: 15, background: 'var(--glass-panel)', padding: '15px', borderRadius: '50%', border: '1px solid var(--border-light)' }}
        >
          <Database color="var(--primary)" size={32} />
        </motion.div>

        <motion.div
          animate={{ x: [-15, 15, -15], y: [-5, 5, -5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ position: 'absolute', top: '20%', right: '5%', zIndex: 15, background: 'var(--glass-panel)', padding: '15px', borderRadius: '50%', border: '1px solid var(--border-light)' }}
        >
          <Code color="var(--primary)" size={32} />
        </motion.div>

        <motion.div
          animate={{ x: [15, -15, 15], y: [10, -10, 10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ position: 'absolute', bottom: '10%', left: '10%', zIndex: 15, background: 'var(--glass-panel)', padding: '15px', borderRadius: '50%', border: '1px solid var(--border-light)' }}
        >
          <Cpu color="var(--primary)" size={32} />
        </motion.div>
        
        <motion.div 
          className="glass-panel" 
          whileHover={{ scale: 1.05, rotateY: 10, rotateX: 5 }}
          style={{
            width: '100%',
            aspectRatio: '1',
            maxWidth: '550px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
            boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6)',
            overflow: 'hidden',
            padding: 0,
            borderRadius: '30px',
            rotate: imageRotate,
            border: '2px solid rgba(16, 185, 129, 0.3)'
          }}
        >
           <motion.img 
             src="/profile.jpeg" 
             alt="Pansin A S Profile" 
             animate={{ scale: [1, 1.05, 1] }}
             transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
             style={{ 
               width: '100%', 
               height: '100%', 
               objectFit: 'cover'
             }} 
           />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
