import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Pansinas',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pansin-a-s-944a0b27b',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    )
  },
  {
    name: 'Email',
    href: 'mailto:pansinaspg@gmail.com',
    icon: <Mail size={20} />
  }
];

const Footer = () => {
  return (
    <footer style={{ 
      padding: '60px var(--padding-x)', 
      borderTop: '1px solid var(--border-light)', 
      textAlign: 'center',
      background: 'rgba(6, 10, 9, 0.5)'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <img 
            src="/profile.jpeg" 
            alt="Pansin A S" 
            style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }} 
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '32px' }}>
          {['About', 'Projects', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>
              {item}
            </a>
          ))}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
           {socialLinks.map((link, idx) => (
             <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name} style={{
               width: '40px', height: '40px', 
               borderRadius: '50%', 
               background: 'rgba(16, 185, 129, 0.05)',
               display: 'grid', placeItems: 'center',
               color: 'var(--text-main)',
               transition: 'all 0.3s ease',
               border: '1px solid var(--border-light)'
             }}
             onMouseOver={(e) => {
               e.currentTarget.style.background = 'var(--primary)';
               e.currentTarget.style.color = '#000';
             }}
             onMouseOut={(e) => {
               e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)';
               e.currentTarget.style.color = 'var(--text-main)';
             }}
             >
               {link.icon}
             </a>
           ))}
        </div>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
           © {new Date().getFullYear()} Pansin A S. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
