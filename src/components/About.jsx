import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import SkillsDashboard from './SkillsDashboard';

const skills = [
  'Python', 'SQL', 'Power BI', 'Machine Learning', 'Data Analytics', 'MATLAB', 'REST APIs', 'Groq API',
  'K-Means Clustering', 'Problem Solving', 'Public Speaking'
];

const About = () => {
  return (
    <section id="about">
      <div className="section-header" style={{ textAlign: 'center' }}>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.8, y: -30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="section-title"
        >
          About Me
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="section-subtitle"
          style={{ margin: '0 auto' }}
        >
          CEO, AI Specialist, and Data Science student blending deep technical expertise with global leadership.
        </motion.p>
      </div>

      <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '60px' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}
        >
          <p>I am Pansin A S, the CEO of Alphovins Global Agro Exports and an Artificial Intelligence & Data Science Engineering student at Hindustan Institute of Technology and Science. I bring a unique blend of executive leadership, global diplomacy experience, and heavy-duty technical skills to the table.</p>
          <p>My technical foundation spans across Python, SQL, Power BI, and robust ML techniques such as K-Means clustering and predictive data analytics. Alongside my engineering coursework, I have gained international exposure representing India in the Global Youth Exchange Program in China and participating in the Best Diplomats program in Geneva.</p>
          <p>Whether I am training predictive AI models, developing digital tracking solutions like SaLeO TrEnD, or managing international export supply chains, my ultimate goal is to build intelligent systems that solve massive, real-world problems.</p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, y: -5, backgroundColor: 'var(--primary)', color: '#000' }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, type: 'spring' }}
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--primary)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  cursor: 'default',
                  transition: 'background-color 0.3s, color 0.3s'
                }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
        >
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02}>
            <motion.div 
              className="glass-panel" 
              whileHover={{ boxShadow: '0 20px 40px rgba(16, 185, 129, 0.15)' }}
              style={{ padding: '30px', perspective: '1000px' }}
            >
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: 'var(--text-main)' }}>Hindustan Institute of Technology and Science</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '4px', fontSize: '1.1rem' }}>B.Tech – Artificial Intelligence & Data Science</p>
              <p style={{ color: 'var(--primary)', fontWeight: 600 }}>2023 - 2027 (Expected)</p>
            </motion.div>
          </Tilt>
          
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02}>
            <motion.div 
              className="glass-panel" 
              whileHover={{ boxShadow: '0 20px 40px rgba(16, 185, 129, 0.15)' }}
              style={{ padding: '30px', perspective: '1000px' }}
            >
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: 'var(--text-main)' }}>Little Champion CBSE School</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '4px', fontSize: '1.1rem' }}>Primary & Secondary Education</p>
            </motion.div>
          </Tilt>

          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02}>
            <motion.div 
              className="glass-panel" 
              whileHover={{ boxShadow: '0 20px 40px rgba(16, 185, 129, 0.15)' }}
              style={{ padding: '30px', perspective: '1000px' }}
            >
              <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: 'var(--text-main)' }}>Global Leadership</h3>
              <ul style={{ color: 'var(--text-muted)', listStyle: 'none', padding: 0, fontSize: '1.05rem', lineHeight: 1.8 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>•</span> 
                  <span><strong>CEO</strong> at Alphovins Global Agro Exports</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>•</span> 
                  <span>Delegate at <strong>Best Diplomats</strong>, Geneva</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>•</span> 
                  <span>Rep. at <strong>Global Youth Exchange</strong>, China</span>
                </li>
              </ul>
            </motion.div>
          </Tilt>
        </motion.div>
      </div>

      {/* Skills Analytics Dashboard */}
      <div style={{ marginTop: '80px' }}>
        <h3 style={{ fontSize: '1.6rem', textAlign: 'center', marginBottom: '10px', color: 'var(--text-main)', fontWeight: 800 }}>
          Skills Analytics
        </h3>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6 }}>
          An interactive overview of my technical competence and executive leadership domains.
        </p>
        <SkillsDashboard />
      </div>
    </section>
  );
};

export default About;
