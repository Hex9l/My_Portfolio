import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiEnvelope } from 'react-icons/hi2';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    const [emailCopied, setEmailCopied] = useState(false);

    const handleEmailClick = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText("henilpatel200425@gmail.com");
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
        window.location.href = "mailto:henilpatel200425@gmail.com";
    };

    return (
        <section id="contact" className="py-16 md:py-24 bg-bg-dark relative overflow-hidden border-t border-white/5">
            <div className="max-w-[1000px] mx-auto px-6 md:px-8 w-full relative z-10 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 uppercase tracking-tight">
                        Contact
                    </h2>

                    <p className="text-text-secondary text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-4">
                        Open to meaningful discussions, collaborations, and opportunities.
                    </p>

                    <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto mb-10 md:mb-12">
                        Available for technical architecture and engineering leadership roles.
                    </p>

                    <div className="flex justify-center gap-8 md:gap-12">
                        <motion.a
                            href="mailto:henilpatel200425@gmail.com"
                            onClick={handleEmailClick}
                            className="group flex flex-col items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className={`p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-purple-500/50 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 ${emailCopied ? 'bg-green-500/20 border-green-500/50' : ''}`}>
                                <HiEnvelope className={`w-6 h-6 ${emailCopied ? 'text-green-400' : ''}`} />
                            </div>
                            <span className={`text-xs uppercase tracking-wider font-semibold ${emailCopied ? 'text-green-400' : ''}`}>
                                {emailCopied ? 'Copied!' : 'Email'}
                            </span>
                        </motion.a>

                        <motion.a
                            href="https://github.com/Hex9l"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-purple-500/50 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
                                <FaGithub className="w-6 h-6" />
                            </div>
                            <span className="text-xs uppercase tracking-wider font-semibold">GitHub</span>
                        </motion.a>

                        <motion.a
                            href="https://www.linkedin.com/in/henil-patel-31aa82241/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-purple-500/50 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
                                <FaLinkedin className="w-6 h-6" />
                            </div>
                            <span className="text-xs uppercase tracking-wider font-semibold">LinkedIn</span>
                        </motion.a>
                    </div>

                    <div className="mt-20 pt-8 border-t border-white/5 text-gray-600 text-xs uppercase tracking-widest">
                        © {new Date().getFullYear()} Henil. Engineered with Precision.
                    </div>

                </motion.div>

            </div>
        </section>
    );
};

export default Contact;
