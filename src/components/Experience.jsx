import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const defaultExperiences = [
  {
    role: "Power BI Intern",
    company: "Cognifyz Technologies",
    period: "July 2024 – Present",
    desc: "Transforming raw data into meaningful insights and reports. Utilizing Power BI for data analysis, storytelling, and interactive data visualizations.",
    category: "internship"
  },
  {
    role: "Chief Executive Officer (CEO)",
    company: "Alphovins Global Agro Exports",
    period: "October 2024 – Present",
    desc: "Managing end-to-end operations including supply chain, pricing, vendor coordination, and digitizing sales tracking using custom software solutions (SaLeO TrEnD).",
    category: "leadership"
  },
  {
    role: "Research Intern – MATLAB & AI/ML",
    company: "IIChE Student Chapter, AMU",
    period: "Jan 2025 – Feb 2025",
    desc: "Explored integration of AI/ML techniques in chemical engineering computations and analyzed system optimzation using MATLAB.",
    category: "internship"
  },
  {
    role: "Artificial Intelligence Intern",
    company: "Plasmid Innovation Ltd",
    period: "June 2024 – August 2024",
    desc: "Developed and implemented AI-driven solutions for industry workflows and real-world problem-solving. Received an LoR for excellence.",
    category: "internship"
  },
  {
    role: "Freelancer",
    company: "Freelancer.com",
    period: "April 2023 – Present",
    desc: "Delivered technical and digital services across multiple domains, managed client requirements, and ensured timely zero-defect project delivery.",
    category: "freelance"
  }
];

// Helper to determine category if missing from DB
const getCategory = (exp) => {
  if (exp.category) return exp.category;
  const roleLower = (exp.role || '').toLowerCase();
  const companyLower = (exp.company || '').toLowerCase();
  if (roleLower.includes('ceo') || roleLower.includes('founder') || companyLower.includes('alphovins')) return 'leadership';
  if (roleLower.includes('freelancer') || roleLower.includes('freelance')) return 'freelance';
  return 'internship';
};

const Experience = () => {
  const [experiencesData, setExperiencesData] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "experiences"));
        if (querySnapshot.empty) {
          // Seed database if empty
          for (const e of defaultExperiences) {
            await addDoc(collection(db, "experiences"), e);
          }
          setExperiencesData(defaultExperiences);
        } else {
          const fetched = [];
          querySnapshot.forEach((doc) => fetched.push(doc.data()));
          setExperiencesData(fetched);
        }
      } catch (e) {
        console.error("Error fetching experiences: ", e);
        setExperiencesData(defaultExperiences); // Fallback if Firestore fails
      }
    };
    fetchExperiences();
  }, []);

  const filteredExperiences = experiencesData.filter(exp => {
    if (filter === 'all') return true;
    return getCategory(exp) === filter;
  });

  return (
    <section id="experience">
      <div className="section-header" style={{ textAlign: 'center' }}>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.8, rotateX: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
          className="section-title"
        >
          Professional Experience
        </motion.h2>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '50px', flexWrap: 'wrap' }}>
        {['all', 'internship', 'leadership', 'freelance'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              background: filter === cat ? 'var(--primary)' : 'transparent',
              color: filter === cat ? '#000' : 'var(--text-muted)',
              border: filter === cat ? '1px solid var(--primary)' : '1px solid var(--border-light)',
              padding: '8px 18px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              if (filter !== cat) {
                e.currentTarget.style.color = 'var(--primary)';
                e.currentTarget.style.borderColor = 'var(--primary)';
              }
            }}
            onMouseOut={(e) => {
              if (filter !== cat) {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }
            }}
          >
            {cat === 'all' ? 'Show All' : cat}
          </button>
        ))}
      </div>

      <div className="timeline-container" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
        {/* Vertical Line */}
        <div className="timeline-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '4px', background: 'var(--primary)', opacity: 0.2, transform: 'translateX(-50%)', borderRadius: '4px' }}></div>

        <motion.div layout style={{ position: 'relative', width: '100%' }}>
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((exp, index) => (
              <motion.div 
                key={`${exp.role}-${exp.company}`}
                className="timeline-item"
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
                style={{ 
                  display: 'flex', 
                  justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                  paddingBottom: '60px',
                  position: 'relative',
                  width: '100%'
                }}
              >
                {/* Timeline Dot */}
                <motion.div 
                  className="timeline-dot"
                  whileHover={{ scale: 1.5, boxShadow: '0 0 30px var(--primary-glow)' }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '30px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--bg-dark)',
                    border: '4px solid var(--primary)',
                    transform: 'translateX(-50%)',
                    boxShadow: '0 0 15px var(--primary-glow)',
                    zIndex: 2,
                    cursor: 'pointer'
                  }}
                ></motion.div>

                <Tilt className="timeline-content" tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} style={{ width: '45%' }}>
                  <motion.div 
                    className="glass-panel" 
                    whileHover={{ boxShadow: '0 20px 40px rgba(var(--primary-rgb), 0.15)', borderColor: 'var(--primary)' }}
                    style={{ padding: '30px', borderRadius: '24px', position: 'relative', overflow: 'hidden', height: '100%' }}
                  >
                    <div style={{ 
                      position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--primary)',
                      boxShadow: '0 0 15px var(--primary-glow)'
                    }} />
                    <div style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>{exp.period}</div>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '8px', fontWeight: 800 }}>{exp.role}</h3>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '16px', fontWeight: 500 }}>{exp.company}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{exp.desc}</p>
                  </motion.div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
