import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'var(--bg-dark)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Core Pulsing Glow */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            background: 'var(--primary-glow)',
            filter: 'blur(30px)',
            borderRadius: '50%'
          }}
        />

        {/* Orbiting Icons */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{ position: 'absolute', top: -15, color: 'var(--primary)' }}><Brain size={30} /></div>
          <div style={{ position: 'absolute', bottom: -15, color: 'var(--primary)' }}><Database size={30} /></div>
        </motion.div>
        
        {/* Profile Picture in Center */}
        <motion.img
          src="/profile.jpeg"
          alt="Loading..."
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid var(--primary)',
            position: 'relative',
            zIndex: 10
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '50px', color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}
      >
        Initializing <span style={{ color: 'var(--primary)' }}>AI</span>...
      </motion.div>
      
      {/* Loading Progress Bar */}
      <div style={{ width: '200px', height: '2px', background: 'rgba(255,255,255,0.1)', marginTop: '20px', borderRadius: '2px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          style={{ height: '100%', background: 'var(--primary)' }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
