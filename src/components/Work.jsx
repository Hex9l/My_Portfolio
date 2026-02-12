import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArchitectureDiagram from './ArchitectureDiagram';
import TerminalIntro from './TerminalIntro';

const Work = () => {
    return (
        <section id="work" className="py-12 md:py-16 bg-bg-dark relative overflow-hidden">
            <div className="max-w-[1000px] mx-auto px-6 md:px-8 w-full relative z-10">

                

                {/* Section Header */}
                    
                <div className="mb-8">
                    <TerminalIntro />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 md:mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
                        Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Work</span>
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed border-l-4 border-purple-500 pl-6"
                    >
                        Architectural case studies demonstrating system design capabilities and engineering rigor in real-world environments.
                    </motion.p>
                </motion.div>

                {/* Single Case Study Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.03] transition-colors duration-500"
                >
                    <div className="p-6 md:p-8 space-y-8 md:space-y-10">

                        {/* 1. Title & 2. Subtitle */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">Enterprise Logistics Intelligence Platform</h3>
                            <p className="text-accent-purple font-mono text-xs md:text-sm tracking-wider uppercase font-semibold">
                                Full-Stack Architecture · Frontend Systems · Backend Engineering
                            </p>
                        </motion.div>

                        {/* 3. Overview */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3 border-b border-white/10 pb-2">Overview</h4>
                            <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                                An end-to-end mission-critical platform enabling real-time asset tracking and complex workflow management. It unifies a responsive, data-rich frontend with a robust, event-driven backend to provide a seamless operational experience for both field agents and central dispatch.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                            {/* 4. What Problem It Solves */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3 border-b border-white/10 pb-2">Operational Challenges</h4>
                                <ul className="text-text-secondary space-y-3 leading-relaxed list-disc list-outside pl-5">
                                    <li><strong>Data Fragmentation:</strong> Operators struggled with disconnected tools for tracking and manifests, leading to context switching and errors.</li>
                                    <li><strong>Real-time Performance:</strong> The legacy interface froze under high load when rendering thousands of moving assets simultaneously.</li>
                                    <li><strong>State Consistency:</strong> Disparate APIs caused synchronization conflicts between dispatch decisions and field unit reality.</li>
                                </ul>
                            </motion.div>

                            {/* 5. How It's Built */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3 border-b border-white/10 pb-2">Engineering Approach</h4>
                                <p className="text-text-secondary leading-relaxed">
                                    Designed as a unified monorepo with strict type safety across the stack. The backend employs a CQRS pattern to separate high-velocity telemetry ingestion from complex business logic, ensuring that heavy data writes never compromise user interface responsiveness. The frontend utilizes optimistic UI patterns to provide instant feedback to operators, masking network latency in critical workflows.
                                </p>
                            </motion.div>
                        </div>

                        {/* 6. Tech Stack */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                        >
                            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3 border-b border-white/10 pb-2">Technology Stack</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <span className="block text-xs uppercase text-gray-500 mb-2 font-semibold">Frontend Systems</span>
                                    <div className="flex flex-wrap gap-2">
                                        {['javascript', 'React', 'TypeScript', 'Tailwind', 'Mapbox GL', 'Redux'].map((t, i) => (
                                            <motion.span
                                                key={t}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.8 + (i * 0.05) }}
                                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                                                className="text-sm text-gray-300 bg-white/5 px-2 py-1 rounded border border-white/5 cursor-default transition-colors"
                                            >
                                                {t}
                                            </motion.span>
                                        ))} 
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-xs uppercase text-gray-500 mb-2 font-semibold">Backend Services</span>
                                    <div className="flex flex-wrap gap-2">
                                        {['Node.js', 'Express.js', 'REST APIs', 'WebSockets', ].map((t, i) => (
                                            <motion.span
                                                key={t}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.9 + (i * 0.05) }}
                                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                                                className="text-sm text-gray-300 bg-white/5 px-2 py-1 rounded border border-white/5 cursor-default transition-colors"
                                            >
                                                {t}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-xs uppercase text-gray-500 mb-2 font-semibold">Data & Infra</span>
                                    <div className="flex flex-wrap gap-2">
                                        {['MySQL', 'MongoDB',  'Docker', 'AWS', 'Vercel', 'Netlify', 'Render'].map((t, i) => (
                                            <motion.span
                                                key={t}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 1.0 + (i * 0.05) }}
                                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                                                className="text-sm text-gray-300 bg-white/5 px-2 py-1 rounded border border-white/5 cursor-default transition-colors"
                                            >
                                                {t}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 7. New: Deployment Setup */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.1, duration: 0.6 }}
                        >
                            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3 border-b border-white/10 pb-2">Deployment & Setup</h4>
                            <p className="text-text-secondary leading-relaxed">
                                The system is containerized using <strong>Docker</strong> to ensure it runs exactly the same on a laptop as it does in the cloud. We use automated pipelines (CI/CD) to test every code change. Updates are rolled out using a "Blue-Green" strategy, meaning new versions are launched alongside old ones, ensuring <strong>zero downtime</strong> for users during releases.
                            </p>
                        </motion.div>

                        {/* 8. System Flow */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                        >
                            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3 border-b border-white/10 pb-2">System Architecture Flow</h4>
                            <div className="my-6">
                                <ArchitectureDiagram />
                            </div>
                            <p className="text-text-secondary leading-relaxed">
                                Field devices push encrypted telemetry via WebSockets, which are broadcast via an event bus to the frontend for sub-second map updates. Simultaneously, administrative actions are processed via secure GraphQL mutations, vetted by business rules, and persisted to a relational database, ensuring a single source of truth across the entire platform.
                            </p>
                        </motion.div>

                    </div>
                </motion.div>

                {/* View All Projects Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex justify-center mt-16"
                >
                    <Link
                        to="/projects"
                        state={{ previousPath: '/#work' }}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white font-bold uppercase tracking-widest hover:bg-white/10 hover:scale-105 transition-all duration-300"
                    >
                        See All Projects
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default Work;
