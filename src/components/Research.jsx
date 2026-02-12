import React from 'react';
import { motion } from 'framer-motion';

const Research = () => {
    const sections = [
        {
            title: "Current Focus",
            content: "I am actively exploring advanced full-stack architectural patterns, specifically refining micro-frontend implementations and expanding into robust cross-platform mobile systems. Simultaneously, I am deepening my understanding of embedding AI-assisted features directly into production workflows to create data-driven user experiences."
        },
        {
            title: "Experiments",
            content: "My technical playground involves practical, system-oriented experiments. I build small internal tools to test new API specifications, prototype alternative state management libraries, and stress-test serverless edge functions. These experiments serve as a proving ground for concepts before they are considered for production codebases."
        },
        {
            title: "Courses & Technical References",
            content: "My growth approach relies on authoritative technical sources. I consistently reference official language documentation, study high-level system design papers, and follow engineering bogs from industry leaders. This structured intake ensures that my technical foundations remain aligned with current best practices and emerging standards."
        },
        {
            title: "Notes & Technical Write-Ups",
            content: "I maintain a disciplined practice of documenting technical insights. This includes writing short internal notes on implementation challenges, logging architectural decision records (ADRs), and reflecting on the outcomes of my experiments. This habit turns transient problem-solving into long-term engineering knowledge."
        }
    ];

    return (
        <section id="research" className="py-24 bg-bg-dark relative overflow-hidden text-white">
            <div className="max-w-[1200px] mx-auto px-8 w-full relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">
                        Research & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Learning</span>
                    </h2>
                    <motion.p 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-text-secondary text-lg max-w-2xl leading-relaxed border-l-4 border-purple-500 pl-6"
                    >
                        A structured approach to technical evolution, prioritizing future readiness and engineering depth.
                    </motion.p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
                        >
                            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide group-hover:text-purple-400 transition-colors duration-300">
                                {section.title}
                            </h3>
                            <p className="text-text-secondary leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Research;
