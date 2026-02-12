import React, { useEffect, useState } from 'react';

const DebugMode = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [keystrokes, setKeystrokes] = useState([]);

    const SECRET_CODE = 'debug';

    useEffect(() => {
        const handleKeyDown = (e) => {
            setKeystrokes((prev) => {
                const newKeystrokes = [...prev, e.key].slice(-SECRET_CODE.length);
                if (newKeystrokes.join('').toLowerCase() === SECRET_CODE) {
                    setIsEnabled((v) => !v);
                }
                return newKeystrokes;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isEnabled) {
            document.body.classList.add('debug-mode');
        } else {
            document.body.classList.remove('debug-mode');
        }
    }, [isEnabled]);

    if (!isEnabled) return null;

    return (
        <div className="fixed top-0 left-0 w-full z-[10000] font-mono text-[#00ff00] text-xs pointer-events-none">
            <div className="bg-black/90 border-b border-[#00ff00] px-4 py-1 flex justify-between items-center">
                <span>SYSTEM DIAGNOSTICS: <span className="animate-pulse font-bold">ONLINE</span></span>
                <span>RENDER MODE: WIREFRAME</span>
                <span>MEM: {Math.floor(Math.random() * 50) + 20}%</span>
                <span>FPS: 60</span>
            </div>
            <div className="debug-overlay"></div>
        </div>
    );
};

export default DebugMode;
