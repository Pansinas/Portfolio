import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "Python", "SQL", "Power BI", "Microsoft Excel", 
  "RESTful APIs", "Groq API", "K-Means Clustering", 
  "MATLAB", "Machine Learning", "Data Science", "Artificial Intelligence", "React", "React Native"
];

const TechMarquee = () => {
  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      padding: '40px 0',
      background: 'var(--bg-panel)',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)',
      position: 'relative'
    }}>
      {/* Gradient fades for the edges */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: '100px',
        background: 'linear-gradient(to right, var(--bg-panel), transparent)',
        zIndex: 2
      }}></div>
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '100px',
        background: 'linear-gradient(to left, var(--bg-panel), transparent)',
        zIndex: 2
      }}></div>

      <motion.div
        animate={{ x: [0, -1500] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
        style={{
          display: 'flex',
          gap: '30px',
          whiteSpace: 'nowrap',
          width: 'max-content'
        }}
      >
        {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
          <div key={index} style={{
            padding: '12px 24px',
            background: 'var(--glass-panel)',
            border: '1px solid var(--border-light)',
            borderRadius: '30px',
            color: 'var(--text-main)',
            fontSize: '1rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}>
            <span style={{ color: 'var(--primary)' }}>✦</span> {skill}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;
