import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroBackground from './HeroBackground';

const MotionLink = motion.create(Link);

const Home = ({ onOpenGame }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Stagger container for text elements
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };



    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-16 max-md:pt-24 relative overflow-hidden bg-bg-dark">
            <HeroBackground />
            <div className="max-w-[1400px] mx-auto px-8 w-full flex flex-col items-center justify-center relative">

                {/* Center - 3D Title (Background/Top) */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-[8rem] leading-[0.9] font-black tracking-tight text-[#3a3a3a] uppercase text-center relative z-[2] text-shadow-3d brightness-110 max-xl:text-[6rem] max-lg:text-[4rem] max-md:text-[13vw]"
                >
                    HI, I'M HENIL
                </motion.h1>

                {/* Main Content - Centered Row */}
                <div className="relative z-[10] flex flex-col xl:flex-row items-center justify-center w-full max-w-[1200px] gap-8 xl:gap-12">

                    {/* Left Side Text (Now Relative & Aligned) */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex-1 flex flex-col items-center xl:items-end text-center xl:text-right order-2 xl:order-1 px-4"
                    >
                        <motion.div variants={itemVariants} className="mb-4 xl:mb-6">
                            <span className="inline-block text-[10px] md:text-xs font-semibold tracking-[0.1em] text-text-secondary border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase bg-bg-dark/50 backdrop-blur-md">
                                DESIGN • CODE • SCALE
                            </span>
                        </motion.div>
                        <motion.p variants={itemVariants} className="text-sm md:text-base xl:text-lg text-text-primary mb-6 xl:mb-8 font-medium leading-relaxed max-w-[90%] md:max-w-[600px] text-balance">
                            I’m an experienced <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-[length:200%_auto] animate-gradient-x">full-stack software developer</span> who combines creativity and technical expertise to build scalable, well-designed applications that solve real-world problems. I work across the full stack, creating intuitive frontends and robust backends to deliver reliable, end-to-end solutions—building scalable, production-ready software systems.
                        </motion.p>
                        <motion.div variants={itemVariants} className="flex gap-3 md:gap-4 justify-center xl:justify-end flex-wrap">
                            <MotionLink
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                to="/projects"
                                state={{ previousPath: '/#home' }}
                                className="inline-block px-5 py-2 md:px-8 md:py-3 xl:px-10 xl:py-4 bg-white text-black text-[10px] sm:text-xs md:text-sm xl:text-base font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
                            >
                                Explore Work
                            </MotionLink>
                            <motion.a
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-5 py-2 md:px-8 md:py-3 xl:px-10 xl:py-4 border border-white/20 text-white text-[10px] sm:text-xs md:text-sm xl:text-base font-bold rounded-full backdrop-blur-sm transition-colors"
                            >
                                Resume
                            </motion.a>
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.2)", borderColor: "rgba(168, 85, 247, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onOpenGame}
                                className="inline-block px-5 py-2 md:px-8 md:py-3 xl:px-10 xl:py-4 border border-purple-500/30 text-purple-400 text-[10px] sm:text-xs md:text-sm xl:text-base font-bold rounded-full backdrop-blur-sm transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] cursor-pointer"
                            >
                                Play Game
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Right Side Image (Centered & Balanced) - FLIP CARD */}
                    {/* Kept animate-float class for continuous floating, added motion.div for entry */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="flex-1 flex flex-col items-center xl:items-start order-1 xl:order-2 animate-float perspective-1000 relative z-20"
                    >
                        <div
                            className={`relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] xl:w-[400px] xl:h-[400px] 2xl:w-[450px] 2xl:h-[450px] transition-all duration-700 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                            style={{ touchAction: 'manipulation' }}
                            onClick={() => setIsFlipped(!isFlipped)}
                        >

                            {/* --- FRONT FACE (Real Photo) --- */}
                            <div className="absolute inset-0 backface-hidden flex items-end justify-center">
                                {/* Rotating Dashed Ring */}
                                <div className="absolute inset-[-20px] border border-white/10 rounded-full border-dashed animate-spin-slow z-0 pointer-events-none"></div>

                                {/* Background Circle */}
                                <div className="absolute inset-0 bg-[#1e1e20] rounded-full translate-x-4 translate-y-4 border-4 border-[#1e1e20] animate-pulse-slow z-[1]"></div>

                                {/* Image Container */}
                                <div className="relative w-full h-full z-10 flex items-end justify-center group cursor-pointer">
                                    <img
                                        src="/henil-avatar6.jpg"
                                        alt="Henil Profile"
                                        className="h-[110%] w-auto object-contain mb-0 relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                        style={{
                                            maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                                            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* --- BACK FACE (3D/Cartoon Avatar) --- */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-end justify-center">
                                {/* Smoke/Glow Effect behind avatar (No Ring/Circle) */}
                                <div className="absolute inset-0 bg-gradient-to-t from-accent-purple/20 to-transparent opacity-60 blur-2xl -z-10 animate-pulse-slow"></div>

                                <div className="relative w-full h-full z-10 flex items-end justify-center group cursor-pointer">
                                    <img
                                        src="/avatar.png"
                                        alt="Henil 3D Avatar"
                                        className="h-[105%] w-auto object-contain mb-0 relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                        style={{
                                            maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                                            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                                        }}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* --- MINIMAL ICON-ONLY FLIP BUTTON (Responsive & Perfect Place) --- */}
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, type: "spring", stiffness: 200 }}
                            onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }}
                            className="absolute bottom-0 right-0 sm:bottom-4 mr-5 sm:right-4 md:bottom-8 md:right-0 z-30 w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                            aria-label="Flip Image"
                        >
                            <div className={`transition-transform duration-700 ${isFlipped ? 'rotate-180' : 'rotate-0'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 xl:h-6 xl:w-6 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </div>
                        </motion.button>
                    </motion.div>
                </div>

            </div>

            {/* Background Ambience from Step 8 preserved implicitly by bg-bg-dark, but adding subtle glows back if needed. 
                The original had <div className="min-h-screen ... pt-20 ... relative overflow-hidden">
            */}
        </section>
    );
};

export default Home;
