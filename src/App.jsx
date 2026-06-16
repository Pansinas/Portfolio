import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import Stats from './components/Stats';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackgroundNodes from './components/BackgroundNodes';
import AIAssistant from './components/AIAssistant';
import './App.css'; 

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      <div className="app-container" style={{ display: loading ? 'none' : 'block', position: 'relative' }}>
        <BackgroundNodes />
        <CustomCursor />
        <Header />
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <TechMarquee />
          <Stats />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <AIAssistant />
      </div>
    </>
  );
}

export default App;
