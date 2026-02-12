import React from 'react';
import { motion } from 'framer-motion';
import { HiDevicePhoneMobile, HiCloud, HiCircleStack } from 'react-icons/hi2';

const ArchitectureDiagram = () => {
    return (
        <div className="w-full h-[250px] md:h-[300px] bg-[#0e0e11] rounded-xl border border-white/10 relative overflow-hidden group select-none">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0e0e11]/50 to-[#0e0e11]"></div>

            {/* Connection Lines Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <line x1="16.666%" y1="50%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                <line x1="50%" y1="50%" x2="83.333%" y2="50%" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
            </svg>

            {/* Animated Data Packets - Bidirectional Flow */}
            <div className="absolute inset-0 pointer-events-none z-0">

                {/* 1. Request: Client -> Gateway */}
                <motion.div
                    className="absolute top-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] -translate-y-1/2"
                    initial={{ left: "16.666%", opacity: 0 }}
                    animate={{
                        left: ["16.666%", "50%"],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 3 // Wait for full cycle
                    }}
                />

                {/* 2. Process: Gateway -> Database */}
                <motion.div
                    className="absolute top-1/2 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7] -translate-y-1/2"
                    initial={{ left: "50%", opacity: 0 }}
                    animate={{
                        left: ["50%", "83.333%"],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1.5, // Start after Request arrives
                        repeatDelay: 3
                    }}
                />

                {/* 3. Response: Database -> Gateway -> Client (Fast Return) */}
                <motion.div
                    className="absolute top-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] -translate-y-1/2"
                    initial={{ left: "83.333%", opacity: 0 }}
                    animate={{
                        left: ["83.333%", "16.666%"], // All the way back
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3.0, // Start after Process finishes
                        repeatDelay: 3
                    }}
                />
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="grid grid-cols-3 w-full max-w-2xl px-8 items-center">

                    {/* Client Node */}
                    <div className="flex justify-center relative group/node">
                        <div className="absolute inset-0 bg-blue-500/20 blur-[40px] rounded-full opacity-0 group-hover/node:opacity-100 transition-opacity duration-500"></div>
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="w-16 h-16 md:w-20 md:h-20 bg-[#1a1a1e] rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl relative z-10 transition-colors group-hover/node:border-blue-500/30"
                        >
                            <HiDevicePhoneMobile className="w-8 h-8 text-blue-400" />
                        </motion.div>
                        <span className="absolute top-full mt-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono group-hover/node:text-blue-400 transition-colors whitespace-nowrap">Client</span>
                    </div>

                    {/* Gateway Node */}
                    <div className="flex justify-center relative group/node">
                        <div className="absolute inset-0 bg-purple-500/20 blur-[40px] rounded-full opacity-0 group-hover/node:opacity-100 transition-opacity duration-500"></div>
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="w-16 h-16 md:w-20 md:h-20 bg-[#1a1a1e] rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl relative z-10 transition-colors group-hover/node:border-purple-500/30"
                        >
                            <HiCloud className="w-8 h-8 text-purple-400" />
                        </motion.div>
                        <span className="absolute top-full mt-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono group-hover/node:text-purple-400 transition-colors whitespace-nowrap">Gateway</span>
                    </div>

                    {/* Database Node */}
                    <div className="flex justify-center relative group/node">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-[40px] rounded-full opacity-0 group-hover/node:opacity-100 transition-opacity duration-500"></div>
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="w-16 h-16 md:w-20 md:h-20 bg-[#1a1a1e] rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl relative z-10 transition-colors group-hover/node:border-emerald-500/30"
                        >
                            <HiCircleStack className="w-8 h-8 text-emerald-400" />
                        </motion.div>
                        <span className="absolute top-full mt-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono group-hover/node:text-emerald-400 transition-colors whitespace-nowrap">Database</span>
                    </div>
                </div>
            </div>

            {/* Status Indicator */}
            <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md border border-white/5 flex items-center gap-2 z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-mono text-gray-400 tracking-wider">FLOW: SYNC</span>
            </div>
        </div>
    );
};

export default ArchitectureDiagram;
