import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Database, Code, Shield, BarChart3, ChevronRight } from 'lucide-react';

const skillCategories = [
  {
    key: 'ml',
    name: 'Machine Learning',
    icon: <Brain size={20} />,
    value: 90,
    desc: 'Developing predictive models and training custom AI solutions for practical engineering problems.',
    skills: ['Predictive Modeling', 'K-Means Clustering', 'Supervised Learning', 'NLP (Transformers)', 'Scikit-Learn', 'MATLAB AI/ML Toolbox']
  },
  {
    key: 'de',
    name: 'Data Engineering',
    icon: <Database size={20} />,
    value: 85,
    desc: 'Designing database architectures, connecting data flows, and implementing AI API pipelines.',
    skills: ['SQL Database Design', 'RESTful APIs', 'Groq API Integration', 'Data Warehousing', 'Data Pipelines', 'Firestore & Realtime DB']
  },
  {
    key: 'dev',
    name: 'Software Dev',
    icon: <Code size={20} />,
    value: 80,
    desc: 'Building responsive web interfaces, cross-platform apps, and custom logistics tracking tools.',
    skills: ['React.js', 'React Native', 'Vite & Node.js', 'CSS Grid & Flexbox', 'Git Version Control', 'SaLeO TrEnD Custom Architecture']
  },
  {
    key: 'lead',
    name: 'Business Leadership',
    icon: <Shield size={20} />,
    value: 95,
    desc: 'Acting as CEO of Alphovins Global Agro Exports, managing logistics, coordination, and international diplomacy.',
    skills: ['Agro-Export Logistics', 'Vendor & Partner Coordination', 'Supply Chain Digitization', 'International Diplomacy', 'B2B Client Management', 'Strategic Decision Making']
  },
  {
    key: 'analytics',
    name: 'Data Analytics',
    icon: <BarChart3 size={20} />,
    value: 88,
    desc: 'Transforming complex datasets into executive dashboards, storyboards, and reports.',
    skills: ['Power BI Analytics', 'Interactive Dashboarding', 'Advanced Excel (Pivot/VLOOKUP)', 'Statistical Data Analysis', 'Business Intelligence', 'Data Storytelling']
  }
];

const SkillsDashboard = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeCategory = skillCategories[selectedIdx];

  // Radar chart configs
  const size = 300;
  const center = size / 2;
  const rMax = 100; // max radius
  const totalAxes = skillCategories.length;

  // Compute point coordinates for pentagon drawing
  const getCoordinates = (index, valuePercent) => {
    const angle = (index * 2 * Math.PI) / totalAxes - Math.PI / 2;
    const r = (rMax * valuePercent) / 100;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Generate pentagon grids
  const gridLevels = [25, 50, 75, 100];
  const gridPaths = gridLevels.map(level => {
    const points = Array.from({ length: totalAxes }).map((_, i) => {
      const { x, y } = getCoordinates(i, level);
      return `${x},${y}`;
    });
    return points.join(' ');
  });

  // Generate coordinates for actual skill data
  const dataPoints = skillCategories.map((cat, i) => getCoordinates(i, cat.value));
  const dataPath = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  // Radial axis lines
  const axisLines = Array.from({ length: totalAxes }).map((_, i) => {
    const { x, y } = getCoordinates(i, 100);
    return { x1: center, y1: center, x2: x, y2: y };
  });

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px',
      alignItems: 'center',
      marginTop: '40px'
    }}>
      {/* Radar Chart SVG side */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <svg width="100%" height={size} viewBox={`0 0 ${size} ${size}`} style={{ maxWidth: '320px', overflow: 'visible' }}>
          {/* Pentagon Concentric Grids */}
          {gridPaths.map((path, idx) => (
            <polygon
              key={idx}
              points={path}
              fill="none"
              stroke="var(--border-light)"
              strokeWidth="1"
            />
          ))}

          {/* Radial Axes */}
          {axisLines.map((line, idx) => (
            <line
              key={idx}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="var(--border-light)"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
          ))}

          {/* Actual Data Area */}
          <polygon
            points={dataPath}
            fill="rgba(var(--primary-rgb), 0.15)"
            stroke="var(--primary)"
            strokeWidth="2.5"
            style={{ transition: 'all 0.5s ease' }}
          />

          {/* Data Vertices (Interactivity) */}
          {dataPoints.map((p, idx) => {
            const isActive = selectedIdx === idx;
            return (
              <g 
                key={idx} 
                onClick={() => setSelectedIdx(idx)} 
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? 7 : 5}
                  fill={isActive ? 'var(--primary)' : 'var(--bg-dark)'}
                  stroke="var(--primary)"
                  strokeWidth="2"
                  style={{ transition: 'all 0.3s' }}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? 14 : 0}
                  fill="rgba(var(--primary-rgb), 0.3)"
                  style={{ transition: 'all 0.3s' }}
                />
              </g>
            );
          })}

          {/* Category Name Labels */}
          {Array.from({ length: totalAxes }).map((_, i) => {
            const { x, y } = getCoordinates(i, 115);
            const catName = skillCategories[i].name;
            let textAnchor = 'middle';
            let dy = '0.35em';
            
            if (x < center - 10) textAnchor = 'end';
            else if (x > center + 10) textAnchor = 'start';
            
            if (y < center - 50) dy = '-0.2em';
            else if (y > center + 50) dy = '0.9em';

            const isActive = selectedIdx === i;

            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor={textAnchor}
                dy={dy}
                onClick={() => setSelectedIdx(i)}
                style={{
                  fill: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  fontSize: '0.72rem',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  userSelect: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {catName.split(' ')[0]}
              </text>
            );
          })}
        </svg>
        
        {/* Navigation Indicator Dots */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
          {skillCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              aria-label={`Select skill category ${cat.name}`}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: 'none',
                background: selectedIdx === idx ? 'var(--primary)' : 'var(--border-light)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Selected Skill Details Panel */}
      <div className="glass-panel" style={{ padding: '30px', position: 'relative', overflow: 'hidden', minHeight: '340px', display: 'flex', flexDirection: 'column' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--primary)',
          boxShadow: '0 0 15px var(--primary-glow)'
        }} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                color: 'var(--primary)',
                background: 'rgba(var(--primary-rgb), 0.08)',
                padding: '10px',
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center'
              }}>
                {activeCategory.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: 800 }}>{activeCategory.name}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Proficiency: {activeCategory.value}%
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
              {activeCategory.desc}
            </p>

            <h4 style={{ color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
              Key Competencies
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flexGrow: 1 }}>
              {activeCategory.skills.map((skill, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <ChevronRight size={14} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillsDashboard;
