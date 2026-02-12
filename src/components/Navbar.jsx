import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HiBars3, HiXMark, HiHome, HiUser, HiBriefcase, HiEnvelope, HiCpuChip, HiBeaker, HiMap, HiCommandLine, HiLightBulb } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Only scroll spy on home page
      if (pathname !== '/') return;

      const sections = ['home', 'work', 'about', 'expertise', 'engineering', 'research', 'roadmap', 'lab', 'insights', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      // Check if scrolled to bottom
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        setActiveSection('contact');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', icon: HiHome, href: '#home' },
    { name: 'Work', icon: HiBriefcase, href: '#work' },
    { name: 'About', icon: HiUser, href: '#about' },
    { name: 'Expertise', icon: HiCommandLine, href: '#expertise' },
    { name: 'Engineering', icon: HiCpuChip, href: '#engineering' },
    { name: 'Research', icon: HiBeaker, href: '#research' },
    { name: 'Roadmap', icon: HiMap, href: '#roadmap' },
    { name: 'Lab', icon: HiCommandLine, href: '#lab' }, // Duplicate icon usage is okay if intentional, or check if specific icon exists
    { name: 'Insights', icon: HiLightBulb, href: '#insights' },
    { name: 'Contact', icon: HiEnvelope, href: '#contact' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 md:h-24 z-50 backdrop-blur-md bg-bg-dark/80 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex justify-between items-center relative">

          {/* Logo / Brand Name */}
          <div className="text-xl font-bold tracking-tighter  opacity-100 transition-opacity">HEXCODE</div>

          {/* Desktop Navigation */}
          {/* Desktop Navigation */}
          <ul className="flex gap-8 list-none max-xl:hidden">
            {navItems.map((item) => {
              const isActive = activeSection === item.name.toLowerCase() && pathname === '/';
              const href = pathname === '/' ? item.href : `/${item.href}`;

              return (
                <li key={item.name} className="relative">
                  <a
                    href={href}
                    className={`relative z-10 text-[0.75rem] font-bold uppercase tracking-[0.15em] transition-colors duration-300 hover:text-white ${isActive ? 'text-white' : 'text-gray-400'}`}
                  >
                    {item.name}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-accent-purple"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button - Moved Z-index higher to overlap sidebar if needed, or sidebar content manages close */}
          <button
            className="xl:hidden text-white p-2 focus:outline-none z-[2002] relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <HiXMark className="w-8 h-8" />
            ) : (
              <HiBars3 className="w-8 h-8" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - "System Control Panel" Style */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            {/* Backdrop - Smooth Blur Fade */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-black/60 z-[2000] xl:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar - Ultra Smooth Entrance */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
                mass: 1
              }}
              // Used 100dvh for mobile browsers, hidden scrollbar styles
              className="fixed top-0 right-0 h-[100dvh] w-auto min-w-[240px] max-w-[90vw] z-[2001] bg-[#0e0e11] border-l border-white/10 flex flex-col shadow-2xl xl:hidden overflow-hidden"
            >
              {/* Panel Header - Tighter Padding */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02] shrink-0">
                <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                  System Nav
                </h2>
                {/* Close Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors p-1"
                >
                  <HiXMark className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation List - Cascading Smooth & Responsive with Hidden Scrollbar */}
              <ul className="flex flex-col gap-0.5 overflow-y-auto w-full p-2 flex-1 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.name.toLowerCase() && pathname === '/';
                  const href = pathname === '/' ? item.href : `/${item.href}`;

                  return (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.03,
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                      }}
                    >
                      <a
                        href={href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        // Highly optimized padding for fitting 10 items on ~600px height
                        className={`relative px-5 py-2.5 rounded-lg flex items-center gap-4 transition-all duration-300 group overflow-hidden whitespace-nowrap
                          ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}
                        `}
                      >
                        {/* Smooth Active Background & Border */}
                        {isActive && (
                          <motion.div
                            layoutId="mobileNavHighlight"
                            className="absolute inset-0 bg-white/[0.03] border-l-2 border-accent-purple"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}

                        {/* Icon with hover glow */}
                        <div className={`relative z-10 p-1 rounded-md transition-all duration-300 ${isActive ? 'bg-accent-purple/20 text-accent-purple' : 'bg-transparent text-gray-500 group-hover:text-white group-hover:bg-white/10'}`}>
                          <item.icon className="w-4 h-4" />
                        </div>

                        {/* Text */}
                        <span className={`text-xs font-mono uppercase tracking-widest relative z-10 transition-all duration-300 ${isActive ? 'font-bold' : 'font-medium group-hover:translate-x-1'}`}>
                          {item.name}
                        </span>

                        {/* Active Indicator Dot (Right Side) */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-4 w-1.5 h-1.5 bg-accent-purple rounded-full shadow-[0_0_8px_#a855f7]"
                          />
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Panel Footer - Clean & Tight */}
              <div className="p-3 border-t border-white/10 text-[10px] text-gray-600 font-mono text-center uppercase tracking-wider bg-white/[0.02] shrink-0">
                HEXCODE SYSTEM v2.0
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;