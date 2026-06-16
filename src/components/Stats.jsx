import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const StatCard = ({ title, value, suffix = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value, 10);
      if (start === end) return;
      
      const duration = 2000;
      const incrementTime = (duration / end);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-panel"
      style={{
        padding: '30px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}
    >
      <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
        {title}
      </div>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section id="stats" style={{ paddingTop: '0', paddingBottom: '60px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
        <StatCard title="Years Coding" value="5" suffix="+" />
        <StatCard title="Global Certifications" value="4" />
        <StatCard title="Businesses Founded" value="1" />
        <StatCard title="Hackathons Won/Attended" value="3" />
      </div>
    </section>
  );
};

export default Stats;
