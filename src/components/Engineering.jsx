/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { motion } from 'framer-motion';
import LiveCode from './LiveCode';
import { HiServer, HiShieldCheck, HiCloud, HiCodeBracket, HiCpuChip, HiCommandLine, HiSwatch, HiArrowRight } from 'react-icons/hi2';

const Engineering = () => {
    // 1. System Design Snapshots
    const snapshots = [
        {
            title: "API Request Flow",
            icon: HiServer,
            flow: ["Client", "CDN", "Gateway", "Service"],
            description: "Optimized request path ensuring low latency and high availability through multi-layer caching and load distribution."
        },
        {
            title: "Authentication",
            icon: HiShieldCheck,
            flow: ["Creds", "Auth Svc", "JWT", "Stored"],
            description: "Stateless authentication using JWTs with strict expiration and refresh token rotation in HTTP-only cookies."
        },
        {
            title: "CI/CD Pipeline",
            icon: HiCloud,
            flow: ["Push", "Test", "Build", "Deploy"],
            description: "Automated delivery pipeline preventing regressions and ensuring zero-downtime deployments."
        }
    ];

    // 2. Technical Decisions
    const decisions = [
        {
            title: "Relational vs. NoSQL",
            problem: "Complex data relationships requiring strict consistency.",
            decision: "MongoDB",
            reason: "Schema-less JSON documents enable flexible data structures, easy frontend integration, and faster development."
        },
        {
            title: "Rendering Strategy",
            problem: "Need for SEO and fast First Contentful Paint (FCP).",
            decision: "Server-Side Rendering",
            reason: "Hydrates faster on client; crawlers receive fully formed HTML immediately."
        },
        {
            title: "Type Safety",
            problem: "Runtime errors during refactoring of large modules.",
            decision: "Strict TypeScript",
            reason: "Compile-time validation serves as documentation and drastically reduces regression bugs."
        }
    ];

    // 4. Process Steps
    const processSteps = ["RFC/Spec", "Development", "Testing", "Deployment", "Monitoring"];

    return (
        <section id="engineering" className="py-12 md:py-16 bg-bg-dark relative overflow-hidden">
            {/* Background elements (matching Expertise.jsx) */}
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
                        Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Approach</span>
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-text-secondary text-lg max-w-2xl leading-relaxed border-l-4 border-purple-500 pl-6"
                    >
                        Building resilient, scalable systems through rigorous design patterns, consistent coding standards, and production-grade tooling.
                    </motion.p>
                </motion.div>


                {/* Section 1: System Design Snapshots */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <HiServer className="text-purple-400" /> System Design Snapshots
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {snapshots.map((snap, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <h4 className="font-bold text-lg text-white mb-4 flex items-center gap-2 relative z-10">
                                    <snap.icon className="text-gray-400 group-hover:text-purple-400 transition-colors" /> {snap.title}
                                </h4>

                                {/* Flow Visualization */}
                                <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide relative z-10">
                                    {snap.flow.map((step, idx) => (
                                        <React.Fragment key={idx}>
                                            <span className="text-xs font-mono px-2 py-1 rounded bg-white/5 border border-white/5 text-gray-300 whitespace-nowrap">
                                                {step}
                                            </span>
                                            {idx < snap.flow.length - 1 && (
                                                <HiArrowRight className="text-gray-600 text-xs shrink-0" />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>

                                <p className="text-sm text-text-secondary leading-relaxed relative z-10">
                                    {snap.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Live Code Section */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <HiCommandLine className="text-green-400" /> Live Engineering
                    </h3>
                    <LiveCode />
                </div>


                {/* Section 2: Technical Decisions */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <HiCodeBracket className="text-pink-400" /> Technical Decisions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {decisions.map((dec, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors relative"
                            >
                                <h4 className="font-bold text-pink-400 mb-4 text-lg">{dec.title}</h4>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Problem</span>
                                        <p className="text-sm text-gray-300 leading-relaxed">{dec.problem}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Decision</span>
                                        <p className="text-sm text-white font-medium">{dec.decision}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Reason</span>
                                        <p className="text-sm text-gray-300 leading-relaxed">{dec.reason}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>


                {/* Section 3 & 7: Performance & Design Principles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

                    {/* Performance */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl bg-white/[0.02] border border-white/10"
                    >
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <HiCpuChip className="text-purple-400" /> Performance & Reliability
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Multi-layer Caching (Browser, CDN, Redis)",
                                "Database Indexing & Query Optimization",
                                "Response Compression (Brotli/Gzip)",
                                "Structured Logging & Centralized Error Tracking"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Design Principles */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl bg-white/[0.02] border border-white/10"
                    >
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <HiSwatch className="text-pink-400" /> Design Principles
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Consistent spacing (4px/8px grid) & typography scale",
                                "Accessible color contrast (WCAG 2.1 AA/AAA)",
                                "Predictable interaction patterns & states",
                                "Responsive-first layout logic (Mobile -> Desktop)"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>


                {/* Section 4: Process & Tooling Combined Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Process (Span 2) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10"
                    >
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <HiCommandLine className="text-purple-400" /> Development Process
                        </h3>
                        <div className="flex flex-wrap items-center gap-3">
                            {processSteps.map((step, i) => (
                                <React.Fragment key={i}>
                                    <div className="bg-black/40 px-4 py-2 rounded-lg border border-white/10 text-sm font-mono text-gray-300 shadow-sm">
                                        {step}
                                    </div>
                                    {i < processSteps.length - 1 && (
                                        <HiArrowRight className="text-gray-600" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </motion.div>

                    {/* Tooling (Span 1) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10"
                    >
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <HiCloud className="text-pink-400" /> Tooling
                        </h3>
                        <div className="space-y-3 text-sm text-gray-400">
                            <p><strong className="text-white">Editor:</strong> VS Code <span className='opacity-50'>(ESLint, Prettier)</span></p>
                            <p><strong className="text-white">Git:</strong> Conventional Commits</p>
                            <p><strong className="text-white">Quality:</strong> Husky, CI Gates</p>
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
};

export default Engineering;
