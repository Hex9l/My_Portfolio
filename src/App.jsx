import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Expertise from './components/Expertise';
import Engineering from './components/Engineering';
import Insights from './components/Insights';
import Research from './components/Research';
import Roadmap from './components/Roadmap';
import Lab from './components/Lab';
import Work from './components/Work';
import Contact from './components/Contact';
import AllProjects from './components/AllProjects';
import GravityFlipGame from './components/GravityFlipGame';
import CommandPalette from './components/CommandPalette';
import DebugMode from './components/DebugMode';
import SystemMetrics from './components/SystemMetrics';
import { AnimatePresence, motion } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';
import Lenis from 'lenis';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const { hash } = useLocation();
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle hash scrolling
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          lenis.scrollTo(element);
        }
      }, 100); // 100ms delay to ensure DOM is ready
    }

    return () => {
      lenis.destroy();
    };
  }, [hash]); // Re-run when hash changes

  return (
    <div className="App antialiased text-text-primary bg-bg-dark min-h-screen selection:bg-accent-purple selection:text-white">
      <DebugMode />
      <CommandPalette />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <main>
            <Home onOpenGame={() => setShowGame(true)} />
            <SystemMetrics />
            <Work />
            <About />
            <Expertise />
            <Engineering />
            <Research />
            <Roadmap />
            <Lab />
            <Insights />
            <Contact />
          </main>
        } />
        <Route path="/projects" element={<AllProjects />} />

      </Routes>


      {/* Game Modal Overlay */}
      <AnimatePresence>
        {showGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowGame(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[95%] sm:w-[90%] max-w-5xl bg-bg-dark border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                  Gravity Flip
                </h3>
                <button
                  onClick={() => setShowGame(false)}
                  className="group p-2 bg-transparent hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all duration-300 border border-transparent hover:border-white/10"
                  title="Close Game"
                >
                  <HiXMark className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              <div className="p-0 sm:p-4 overflow-y-auto bg-black/20">
                <GravityFlipGame />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
}

export default App;
