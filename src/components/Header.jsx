import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Palette } from 'lucide-react';

const themes = [
  { id: 'emerald', label: 'Emerald Mint', color: '#10B981' },
  { id: 'sapphire', label: 'Sapphire Blue', color: '#3B82F6' },
  { id: 'amethyst', label: 'Amethyst Purple', color: '#8B5CF6' },
  { id: 'amber', label: 'Amber Gold', color: '#F59E0B' }
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'emerald';
  });
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.body.className = `theme-${activeTheme}`;
  }, [activeTheme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Scroll spy
    const sections = ['hero', 'about', 'experience', 'projects', 'contact'];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header height
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy(); // Initial run

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollSpy);
    };
  }, []);

  const changeTheme = (themeId) => {
    setActiveTheme(themeId);
    localStorage.setItem('portfolio-theme', themeId);
    setShowThemeMenu(false);
  };

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--primary)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 1000,
          boxShadow: '0 0 10px var(--primary-glow)'
        }}
      />
      <motion.header
        className="app-header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.3s ease',
          padding: scrolled ? '15px var(--padding-x)' : '30px var(--padding-x)',
          background: scrolled ? 'var(--glass-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-light)' : '1px solid transparent',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            overflow: 'hidden', border: '2px solid var(--primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <img 
              src="/profile.jpeg" 
              alt="Pansin A S" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Pansin A S</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI & Data Science Engineer</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <nav className="header-nav" style={{ display: 'flex', gap: '24px' }}>
            {['About', 'Experience', 'Projects', 'Contact'].map((item) => {
              const itemLower = item.toLowerCase();
              const isActive = activeSection === itemLower;
              return (
                <a
                  key={item}
                  href={`#${itemLower}`}
                  style={{
                    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                    textDecoration: 'none',
                    fontWeight: isActive ? 700 : 600,
                    fontSize: '0.875rem',
                    transition: 'all 0.3s',
                    position: 'relative'
                  }}
                  onMouseOver={(e) => { if (!isActive) e.target.style.color = 'var(--text-main)'; }}
                  onMouseOut={(e) => { if (!isActive) e.target.style.color = 'var(--text-muted)'; }}
                >
                  {item}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      style={{
                        position: 'absolute',
                        bottom: '-6px',
                        left: '0',
                        right: '0',
                        height: '2px',
                        background: 'var(--primary)',
                        borderRadius: '2px',
                        boxShadow: '0 0 8px var(--primary)'
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Theme Selector Button */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              aria-label="Customize theme colors"
              style={{
                background: 'transparent',
                color: showThemeMenu ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: '50%',
                transition: 'all 0.3s',
                border: showThemeMenu ? '1px solid var(--primary)' : '1px solid var(--border-light)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = 'var(--primary)';
                e.currentTarget.style.borderColor = 'var(--primary)';
              }}
              onMouseOut={(e) => {
                if (!showThemeMenu) {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                }
              }}
            >
              <Palette size={18} />
            </button>

            {showThemeMenu && (
              <div className="glass-panel" style={{
                position: 'absolute',
                top: '140%',
                right: 0,
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                zIndex: 1000,
                minWidth: '160px',
                background: 'var(--bg-panel)',
                border: '1px solid var(--border-light)',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
              }}>
                {themes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => changeTheme(t.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: activeTheme === t.id ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                      border: 'none',
                      color: activeTheme === t.id ? 'var(--primary)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      textAlign: 'left',
                      width: '100%',
                      fontSize: '0.85rem',
                      fontWeight: activeTheme === t.id ? 700 : 500,
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = 'var(--text-main)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = activeTheme === t.id ? 'var(--primary)' : 'var(--text-muted)';
                      e.currentTarget.style.background = activeTheme === t.id ? 'rgba(16, 185, 129, 0.08)' : 'transparent';
                    }}
                  >
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: t.color, display: 'inline-block' }}></span>
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
