import React from 'react';
import { motion } from 'framer-motion';

const Insights = () => {
    const insights = [
        {
            title: "Asynchronous Compute Integration",
            context: "Integrating latency-sensitive REST endpoints with heavy Python inference models.",
            lesson: "Decoupling inference via asynchronous queues prevents blocking the main server threads. This ensures the edge remains responsive while workers process heavy loads independently, avoiding HTTP timeouts on long-running tasks."
        },
        {
            title: "Deterministic Document Generation",
            context: "Transitioning from DOM-snapshot PDF generation to programmatic rendering.",
            lesson: "DOM-based generation is fragile across rendering engines. Programmatic, coordinate-based rendering guarantees byte-for-byte consistency and cleaner hydration state, eliminating visual artifacts in financial documents."
        },
        {
            title: "State-Driven Navigation Logic",
            context: "Managing navigation consistency across conflicting mobile and desktop paradigms.",
            lesson: "State often desynchronizes when duplicated. Deriving UI visibility directly from the router or single-source store prevents 'zombie' overlays during resizing or deep-linking events."
        },
        {
            title: "Visualizing Dependency Graphs",
            context: "Visualizing multi-threaded technical progression beyond linear lists.",
            lesson: "Linear lists obscure complexity. Modeling roadmaps as Directed Acyclic Graphs (DAGs) exposes the true critical path and dependent blockers, reflecting the actual non-linear nature of software engineering."
        }
    ];

    return (
        <section id="insights" className="py-24 bg-bg-dark relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-8 w-full relative z-10">

                {/* Intro Line */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
                        Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Insights</span>
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-text-secondary text-lg max-w-2xl leading-relaxed border-l-4 border-purple-500 pl-6"
                    >
                        Technical reflections on system architecture, trade-offs, and lessons learned from production environments.
                    </motion.p>
                </motion.div>

                {/* Insights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {insights.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -5, boxShadow: '0 20px 40px -15px rgba(168, 85, 247, 0.1)' }}
                            className="group p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                            <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide group-hover:text-purple-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-400 mb-4 font-mono border-b border-white/10 pb-4">
                                {item.context}
                            </p>
                            <p className="text-text-secondary leading-relaxed group-hover:text-white/90 transition-colors">
                                {item.lesson}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Insights;
