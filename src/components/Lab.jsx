import React from 'react';
import { motion } from 'framer-motion';

const Lab = () => {
    const experiments = [
        {
            title: "Experimental Tools",
            description: "Building small utilities and internal tools to automate repetitive workflows and test new development patterns in isolation."
        },
        {
            title: "Side Systems",
            description: "Architecting lightweight systems to explore event-driven patterns, serverless orchestrations, and novel database schemas."
        },
        {
            title: "AI Experiments",
            description: "Early-stage integration of local LLMs and computer vision models to enhance interface interactivity and data processing."
        },
        {
            title: "UI Concepts",
            description: "Prototyping advanced interaction models and design system tokens to push the boundaries of web animation and usability."
        }
    ];

    return (
        <section id="lab" className="py-24 bg-bg-dark relative overflow-hidden text-white">
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
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Lab</span>
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-text-secondary text-lg max-w-2xl leading-relaxed border-l-4 border-purple-500 pl-6"
                    >
                        This section represents experimental work, technical explorations, and early-stage ideas.
                    </motion.p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {experiments.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl group hover:bg-white/[0.05] transition-colors duration-300 relative overflow-hidden"
                        >
                            {/* Glitch Effect on Hover */}
                            <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-100 mix-blend-overlay" />

                            <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide group-hover:text-purple-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-text-secondary leading-relaxed text-sm">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>



            </div>
        </section>
    );
};

export default Lab;
