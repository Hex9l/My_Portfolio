import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
    HiCommandLine,
    HiHome,
    HiBriefcase,
    HiUser,
    HiCpuChip,
    HiEnvelope,
    HiDocumentText,
    HiBeaker
} from 'react-icons/hi2';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    const actions = [
        { id: 'home', label: 'Home', icon: HiHome, type: 'link', path: '/#home' },
        { id: 'work', label: 'Work', icon: HiBriefcase, type: 'link', path: '/#work' },
        { id: 'about', label: 'About', icon: HiUser, type: 'link', path: '/#about' },
        { id: 'expertise', label: 'Expertise', icon: HiCommandLine, type: 'link', path: '/#expertise' },
        { id: 'engineering', label: 'Engineering', icon: HiCpuChip, type: 'link', path: '/#engineering' },
        { id: 'research', label: 'Research', icon: HiBeaker, type: 'link', path: '/#research' },
        { id: 'resume', label: 'Resume', icon: HiDocumentText, type: 'external', path: '/resume.pdf' },
        { id: 'contact', label: 'Contact', icon: HiEnvelope, type: 'link', path: '/#contact' },
    ];

    const filteredActions = actions.filter(action =>
        action.label.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Reset selection when search changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    const handleNavigate = (action) => {
        if (action.type === 'link') {
            if (action.path.startsWith('/#')) {
                // Handle hash navigation manually if needed, or let router handle it
                // Using navigate to /#hash might work depending on router setup
                // If on homepage, just scroll. If not, go to home then scroll.
                const hash = action.path.substring(1); // #home
                navigate('/');
                // Small timeout to allow nav
                setTimeout(() => {
                    const el = document.getElementById(hash.substring(1));
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                navigate(action.path);
            }
        } else if (action.type === 'external') {
            window.open(action.path, '_blank');
        }
        setIsOpen(false);
        setSearch('');
    };

    const handleKeyNavigation = (e) => {
        if (!isOpen) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % filteredActions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredActions[selectedIndex]) {
                handleNavigate(filteredActions[selectedIndex]);
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[5000] flex items-start justify-center pt-[20vh] px-4 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                    onKeyDown={handleKeyNavigation}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-lg bg-[#0e0e11] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Input Area */}
                        <div className="flex items-center px-4 py-4 border-b border-white/5">
                            <HiCommandLine className="w-5 h-5 text-gray-500 mr-3" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Type a command or search..."
                                className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-base font-mono"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onKeyDown={handleKeyNavigation}
                            />
                            <div className="hidden sm:flex gap-1">
                                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400">ESC</span>
                            </div>
                        </div>

                        {/* Results List */}
                        <div className="max-h-[300px] overflow-y-auto py-2">
                            {filteredActions.length > 0 ? (
                                filteredActions.map((action, index) => (
                                    <button
                                        key={action.id}
                                        onClick={() => handleNavigate(action)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors
                                            ${index === selectedIndex ? 'bg-white/5 border-l-2 border-accent-purple' : 'border-l-2 border-transparent hover:bg-white/5'}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <action.icon className={`w-5 h-5 ${index === selectedIndex ? 'text-accent-purple' : 'text-gray-400'}`} />
                                            <span className={`text-sm ${index === selectedIndex ? 'text-white' : 'text-gray-300'}`}>
                                                {action.label}
                                            </span>
                                        </div>
                                        {index === selectedIndex && (
                                            <span className="text-xs text-gray-500 font-mono">Jump to</span>
                                        )}
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center text-gray-500 text-sm font-mono">
                                    No commands found.
                                </div>
                            )}
                        </div>

                        {/* Footer Hints */}
                        <div className="px-4 py-2 bg-white/[0.02] border-t border-white/5 flex justify-between items-center text-[10px] text-gray-600 font-mono uppercase tracking-wider">
                            <div className="flex gap-4">
                                <span>↑↓ Navigate</span>
                                <span>↵ Select</span>
                            </div>
                            <div>
                                HEXCODE SYSTEM v2.0
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
