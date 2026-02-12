import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const TerminalIntro = () => {
    const [lines, setLines] = useState([]);
    const scrollRef = useRef(null);
    const isInView = useInView(scrollRef, { once: true, margin: "-100px" });

    const content = [
        { text: "> initializing portfolio...", delay: 0 },
        { text: "> loading modules... [Full-Stack, UI/UX, Systems]", delay: 800 },
        { text: "> upcoming modules... [App Development, AI, ...]", delay: 2200 },
        { text: "> welcome_user.sh", delay: 3600 },
    ];

    useEffect(() => {
        if (isInView) {
            let timeouts = [];
            content.forEach((line, index) => {
                const timeout = setTimeout(() => {
                    setLines(prev => [...prev, line.text]);
                }, line.delay);
                timeouts.push(timeout);
            });

            return () => timeouts.forEach(clearTimeout);
        }
    }, [isInView]);

    return (
        <div ref={scrollRef} className="w-full max-w-2xl mx-auto mb-12 font-mono text-sm md:text-base">
            <div className="bg-[#0e0e11] border border-white/10 rounded-lg p-4 shadow-lg opacity-90">
                <div className="flex flex-col gap-2">
                    {lines.map((line, i) => (
                        <div key={i} className="text-gray-300">
                            <span className="text-green-500 mr-2">➜</span>
                            {line}
                        </div>
                    ))}
                    {lines.length < content.length + 1 && (
                        <div className="text-gray-300">
                            <span className="text-green-500 mr-2">➜</span>
                            <span className="inline-block w-2.5 h-4 bg-gray-500 animate-pulse align-middle"></span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TerminalIntro;
