import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiServer, HiCodeBracket, HiCpuChip, HiGlobeAlt } from 'react-icons/hi2';

const MetricCard = ({ label, value, suffix = '', icon: Icon, delay }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, parseFloat(value), { duration: 2, delay: delay, ease: "easeOut" });
            return controls.stop;
        }
    }, [isInView, value, delay]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: delay }}
            className="flex flex-col items-center justify-center p-6 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.05] transition-colors group"
        >
            <div className="mb-3 p-3 bg-white/5 rounded-full text-accent-purple group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6" />
            </div>
            <motion.div className="text-3xl md:text-4xl font-bold text-white font-mono mb-1">
                {rounded}
            </motion.div>
            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-medium">
                {label}
            </div>
        </motion.div>
    );
};

const SystemMetrics = () => {
    return (
        <section className="py-12 md:py-20 bg-bg-dark relative border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    <MetricCard
                        label="System Uptime"
                        value={99.9}
                        suffix="%"
                        icon={HiServer}
                        delay={0.1}
                    />
                    <MetricCard
                        label="Projects Built"
                        value={10}
                        suffix="+"
                        icon={HiCodeBracket}
                        delay={0.2}
                    />
                    <MetricCard
                        label="Perf Score"
                        value={98}
                        suffix=""
                        icon={HiCpuChip}
                        delay={0.3}
                    />
                    <MetricCard
                        label="Deployments"
                        value={14}
                        suffix="+"
                        icon={HiGlobeAlt}
                        delay={0.4}
                    />
                </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </section>
    );
};

export default SystemMetrics;
