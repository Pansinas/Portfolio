import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { X } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const defaultProjects = [
  {
    title: 'Sales Forecasting Model',
    category: 'Data Science & ML',
    desc: 'Built a machine learning model using Python to predict sales trends and applied K-Means clustering for accurate customer segmentation.',
    details: 'This project involved collecting and cleaning large sets of raw sales data. I utilized Python libraries like Pandas and Scikit-learn to train a predictive model that accurately forecasted future sales trends. Additionally, I applied K-Means clustering to segment the customer base, allowing for highly targeted marketing campaigns that improved overall conversion rates.',
    outcomes: ['High accuracy in sales forecasting', 'Improved customer targeting', 'Data-driven decision making'],
    tags: ['Python', 'K-Means', 'Predictive Analysis']
  },
  {
    title: 'AI-Based Multilingual Tool',
    category: 'Natural Language Processing',
    desc: 'Actively developing a real-time AI tool to bridge language barriers using NLP, highly focused on translation speed and global accessibility.',
    details: 'Language barriers are a massive hindrance to global collaboration. This ongoing project focuses on utilizing advanced Natural Language Processing (NLP) to create a tool capable of translating technical and conversational speech in real-time. The architecture prioritizes low latency and high accuracy across multiple dialects, utilizing optimized transformer models.',
    outcomes: ['Real-time translation pipeline', 'Global accessibility focus', 'Low latency architecture'],
    tags: ['NLP', 'Real-time', 'In Progress']
  },
  {
    title: 'ALPHOVINS GLOBAL AGRO EXPORTS',
    link: 'https://alphovins.com',
    category: 'Software Architecture',
    desc: 'Conceptualized and guided the development of custom software solutions for digital sales tracking under Alphovins operations.',
    details: 'As CEO, I directly oversaw the creation of "SaLeO TrEnD", a proprietary software solution designed to digitize our complex supply chain and sales tracking operations. This involved architecting the database structure, managing the development team, and ensuring the final product met the rigorous demands of global B2B logistics.',
    outcomes: ['Digitized end-to-end supply chain', 'Custom database architecture', 'Streamlined B2B operations'],
    tags: ['Logistics', 'Database Management', 'B2B']
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        if (querySnapshot.empty) {
          // Seed database if empty
          for (const p of defaultProjects) {
            await addDoc(collection(db, "projects"), p);
          }
          setProjectsData(defaultProjects);
        } else {
          const fetched = [];
          querySnapshot.forEach((doc) => fetched.push(doc.data()));
          setProjectsData(fetched);
        }
      } catch (e) {
        console.error("Error fetching projects: ", e);
        setProjectsData(defaultProjects); // Fallback if Firestore fails
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" style={{ position: 'relative' }}>
      <div className="section-header">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Featured Projects
        </motion.h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
        {projectsData.map((project, index) => (
          <Tilt key={index} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} transitionSpeed={2000}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel" 
              style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}
              onClick={() => setSelectedProject(project)}
            >
              <div style={{ padding: '30px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {project.category}
                </span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-main)' }}>
                  {project.link ? (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: 'var(--primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.title} 
                      <span style={{ fontSize: '0.9em' }}>↗</span>
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '24px', flexGrow: 1 }}>
                  {project.desc}
                </p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{ 
                      background: 'rgba(16, 185, 129, 0.05)', 
                      padding: '6px 12px', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      color: 'var(--text-muted)',
                      border: '1px solid rgba(16, 185, 129, 0.1)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
              onClick={() => setSelectedProject(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel"
              style={{ position: 'relative', width: '100%', maxWidth: '600px', padding: '40px', zIndex: 10000, background: 'var(--bg-panel)', border: '1px solid var(--primary)' }}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>

              <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {selectedProject.category}
              </span>
              <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', marginTop: '10px', marginBottom: '24px' }}>
                {selectedProject.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '30px' }}>
                {selectedProject.details}
              </p>
              
              <h4 style={{ color: 'var(--text-main)', marginBottom: '12px' }}>Key Outcomes:</h4>
              <ul style={{ color: 'var(--text-muted)', marginBottom: '30px', paddingLeft: '20px', lineHeight: 1.6 }}>
                {selectedProject.outcomes.map((outcome, i) => (
                  <li key={i}>{outcome}</li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedProject.tags.map(tag => (
                  <span key={tag} style={{ 
                    background: 'var(--primary)', 
                    padding: '6px 14px', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem', 
                    color: '#000',
                    fontWeight: 600
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
