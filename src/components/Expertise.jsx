import React from 'react';
import { motion } from 'framer-motion';

const Expertise = () => {
    return (
        <section id="expertise" className="py-12 md:py-16 bg-bg-dark relative overflow-hidden">
            {/* Background enhancement */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-6 md:px-8 w-full relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 md:mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Expertise</span>
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-text-secondary text-lg max-w-2xl leading-relaxed border-l-4 border-purple-500 pl-6"
                    >
                        My technical capability is organized as an evolving engineering ecosystem, prioritizing architectural stability and system readiness over transient tool formatting.
                    </motion.p>
                </motion.div>

                {/* Expertise Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Web Engineering */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{ y: -10, boxShadow: '0 20px 40px -15px rgba(168, 85, 247, 0.2)' }}
                        className="group p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/50 hover:bg-white/[0.05] transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide group-hover:text-purple-400 transition-colors relative z-10">
                            Web Engineering
                        </h3>
                        <p className="text-text-secondary leading-relaxed relative z-10">
                            I architect and implement resilient web systems, spanning responsive frontend interfaces to high-concurrency backend services. The focus is on creating production-grade environments where security, authentication, and performance are integral components of the design, ensuring long-term stability and ease of maintenance.
                        </p>
                    </motion.div>

                    {/* App Development */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ y: -10, boxShadow: '0 20px 40px -15px rgba(236, 72, 153, 0.2)' }}
                        className="group p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-pink-500/50 hover:bg-white/[0.05] transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide group-hover:text-pink-400 transition-colors relative z-10">
                            App Development
                        </h3>
                        <p className="text-pink-400 font-mono text-sm tracking-wider uppercase font-semibold mb-4 relative z-10">
                            Work in Progress
                        </p>
                        <p className="text-text-secondary leading-relaxed relative z-10">
                            Applying distributed system principles to mobile environments, I am structuring architectures for cross-platform stability. My approach abstracts core logic from platform-specific implementations, establishing a codebase ready for scalable, native-performance applications.
                        </p>
                    </motion.div>

                    {/* AI / ML */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        whileHover={{ y: -10, boxShadow: '0 20px 40px -15px rgba(168, 85, 247, 0.2)' }}
                        className="group p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/50 hover:bg-white/[0.05] transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide group-hover:text-purple-400 transition-colors relative z-10">
                            AI / ML Integration
                        </h3>
                        <p className="text-accent-purple font-mono text-sm tracking-wider uppercase font-semibold mb-4 relative z-10">
                            Work in Progress
                        </p>
                        <p className="text-text-secondary leading-relaxed relative z-10">
                            I integrate intelligence into software ecosystems by embedding data-driven workflows and automated decision-making. The focus is on the practical application of AI models within production infrastructure, ensuring seamless interoperability between traditional software logic and probabilistic machine learning components.
                        </p>
                    </motion.div>

                </div>

            </div>
        </section>
    );
};

export default Expertise;
