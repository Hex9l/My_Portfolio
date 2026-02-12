import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowLongDown } from 'react-icons/hi2';

const Roadmap = () => {
    const stages = [
        {
            number: "01",
            stage: "Present Focus",
            title: "Advanced Full-Stack Systems",
            content: "I am currently deepening my expertise in full-stack architecture, with a relentless focus on performance, scalability, and reliability. My objective is to build battle-hardened, production-ready systems that can handle real-world scale without compromise."
        },
        {
            number: "02",
            stage: "Near-Term Expansion",
            title: "App Engineering",
            content: "My next strategic step is extending these system design principles into mobile and cross-platform environments. I aim to structure unified logic layers that drive native performance across devices, ensuring stability and consistency in critical applications."
        },
        {
            number: "03",
            stage: "Mid-Term Direction",
            title: "AI-Driven Systems",
            content: "Moving forward, I will integrate intelligent features directly into the core of software products. This involves automating complex workflows and embedding data-driven decision logic to create systems that are not just functional, but adaptive and proactive."
        },
        {
            number: "04",
            stage: "Long-Term Vision",
            title: "Product & SaaS Development",
            content: "The ultimate trajectory is end-to-end product ownership. I envision building and deploying independent software products from concept to scale, creating maintainable, user-focused SaaS solutions that solve tangible problems in the market."
        }
    ];

    return (
        <section id="roadmap" className="py-24 bg-bg-dark relative overflow-hidden text-white">
            <div className="max-w-[1000px] mx-auto px-8 w-full relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">
                        Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Roadmap</span>
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent max-w-2xl mx-auto mb-6"
                    />
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
                        This roadmap outlines my trajectory towards building comprehensive, scalable, and intelligent software systems.
                    </p>
                </motion.div>

                {/* Flow Chart Timeline */}
                <div className="relative">
                    {/* Central Line */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "linear" }}
                        className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0 -translate-x-1/2 hidden md:block"
                    />

                    <div className="space-y-12 md:space-y-24 relative">
                        {stages.map((stage, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Content Card */}
                                <div className="w-full md:w-1/2 md:px-12 relative group">
                                    <div className={`
                                        bg-white/[0.03] border border-white/10 p-8 rounded-2xl relative transition-all duration-300 hover:bg-white/[0.05] hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]
                                        ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}
                                    `}>
                                        <div className="text-accent-purple font-mono text-xs uppercase tracking-wider font-bold mb-3">
                                            Stage {stage.number} — {stage.stage}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">
                                            {stage.title}
                                        </h3>
                                        <p className="text-text-secondary leading-relaxed text-sm">
                                            {stage.content}
                                        </p>

                                        {/* Mobile connector line */}
                                        <div className="absolute left-1/2 -top-8 bottom-full w-[2px] bg-white/10 -translate-x-1/2 md:hidden" />
                                        {index < stages.length - 1 && (
                                            <div className="absolute left-1/2 top-full h-8 w-[2px] bg-white/10 -translate-x-1/2 md:hidden" />
                                        )}
                                    </div>

                                    {/* Desktop Arrow Connector */}
                                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 text-purple-500/50 text-3xl
                                        ${index % 2 === 0 ? '-right-4 translate-x-1/2' : '-left-4 -translate-x-1/2'}
                                    `}>
                                        {/* Simple dot for now, or arrow */}
                                    </div>
                                </div>

                                {/* Center Point */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                                    className="relative z-10 hidden md:flex items-center justify-center w-12 h-12"
                                >
                                    <div className="w-4 h-4 rounded-full bg-bg-dark border-4 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                                </motion.div>

                                {/* Empty space for alternating layout */}
                                <div className="hidden md:block w-1/2" />
                            </motion.div>
                        ))}
                    </div>

                    {/* End Cap */}
                    <div className="flex justify-center mt-12 md:mt-24">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.5 }}
                            transition={{ delay: 1 }}
                            className="flex flex-col items-center"
                        >
                            <HiArrowLongDown className="text-3xl text-purple-500 animate-bounce" />
                            <span className="text-xs uppercase tracking-widest text-purple-500 mt-2">Evolution Continues</span>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Roadmap;
