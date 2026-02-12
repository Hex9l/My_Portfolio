import React from 'react';
import { motion } from 'framer-motion';
import TerminalIntro from './TerminalIntro';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="about" className="py-12 md:py-16 bg-bg-dark relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 md:px-8 w-full relative z-10 mt-8 md:mt-12">

                {/* Terminal Intro */}
              

                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl font-black text-white mb-8 md:mb-12 uppercase tracking-tighter text-center"
                >
                    Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Excellence</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

                    {/* Left Column - Philosophy & Approach */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-8 text-text-secondary text-lg leading-relaxed"
                    >
                        <motion.p variants={itemVariants} className="text-xl font-medium text-white border-l-4 border-purple-500 pl-6">
                            I engineer complete software solutions, moving seamlessly from architectural design to production deployment.
                        </motion.p>

                        <motion.p variants={itemVariants}>
                            My approach to engineering is rooted in systems thinking and structured problem-solving. I analyze challenges through the lens of long-term stability and efficiency, ensuring that every architectural decision optimizes for performance and maintainability. Trade-offs are made deliberately, prioritizing logical consistency and robustness over temporary convenience.
                        </motion.p>

                        <motion.p variants={itemVariants}>
                            I build with precision and a focus on operational excellence. Clean, modular code is the baseline, not the exception. I advocate for reliability and predictability in software behavior, ensuring that the systems I create are easy to reason about, test, and extend. Responsiveness to failure and rigor in error handling are central to my execution strategy.
                        </motion.p>

                        <motion.p variants={itemVariants}>
                            Growth is a continuous process of refining foundational understanding rather than chasing trends. I focus on mastering architectural patterns and adapting to evolving paradigms, ensuring readiness for future engineering challenges regardless of the specific technologies required.
                        </motion.p>
                    </motion.div>

                    {/* Right Column - Core Values */}
                    <div className="space-y-12">
                        <motion.h3
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-2xl font-bold text-white mb-8 uppercase tracking-wide border-b border-white/10 pb-4"
                        >
                            Core Engineering Values
                        </motion.h3>

                        {/* Value 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            whileHover={{ x: 10 }}
                            className="group cursor-default"
                        >
                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Quality</h4>
                            <p className="text-text-secondary group-hover:text-white/80 transition-colors duration-300">
                                Reliability is paramount; I write code that is stable, testable, and built to last.
                            </p>
                        </motion.div>

                        {/* Value 2 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            whileHover={{ x: 10 }}
                            className="group cursor-default"
                        >
                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Scalability</h4>
                            <p className="text-text-secondary group-hover:text-white/80 transition-colors duration-300">
                                Systems are designed with foresight to handle increased load and complexity without structural collapse.
                            </p>
                        </motion.div>

                        {/* Value 3 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileHover={{ x: 10 }}
                            className="group cursor-default"
                        >
                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Ownership</h4>
                            <p className="text-text-secondary group-hover:text-white/80 transition-colors duration-300">
                                I take full responsibility for the lifecycle of the software, from the initial design phase to production monitoring.
                            </p>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;
