import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlay, HiArrowPath, HiTrophy, HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';

// --- SOUND MANAGER ---

const SoundManager = {
    ctx: null,
    masterGain: null,
    isMuted: false,

    init: () => {
        if (!SoundManager.ctx) {
            SoundManager.ctx = new (window.AudioContext || window.webkitAudioContext)();
            SoundManager.masterGain = SoundManager.ctx.createGain();
            SoundManager.masterGain.connect(SoundManager.ctx.destination);
            SoundManager.masterGain.gain.value = 0.5; // Default volume
        }
        if (SoundManager.ctx.state === 'suspended') {
            SoundManager.ctx.resume();
        }
    },

    toggleMute: () => {
        SoundManager.isMuted = !SoundManager.isMuted;
        if (SoundManager.masterGain) {
            const target = SoundManager.isMuted ? 0 : 0.5;
            SoundManager.masterGain.gain.setTargetAtTime(target, SoundManager.ctx.currentTime, 0.1);
        }
        return SoundManager.isMuted;
    },

    playFlip: () => {
        if (!SoundManager.ctx || SoundManager.isMuted) return;
        const ctx = SoundManager.ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(SoundManager.masterGain);

        // Cute "Jump" (Sine, quick pitch up)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    },

    playGameOver: () => {
        if (!SoundManager.ctx || SoundManager.isMuted) return;
        const ctx = SoundManager.ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(SoundManager.masterGain);

        // Cute "Fail" (Sawtooth, slide down + wobble)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.5);

        // Wobble
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 10;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 50;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();
        lfo.stop(ctx.currentTime + 0.5);

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);

        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    }
};

const GravityFlipGame = () => {
    // Game State
    const [gameState, setGameState] = useState('MENU'); // MENU, PLAYING, GAME_OVER
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [showNewBest, setShowNewBest] = useState(false);

    // Refs
    const canvasRef = useRef(null);
    const requestRef = useRef(null);

    // Input Handling Refs
    const lastInputTime = useRef(0);
    const lastTouchTime = useRef(0); // Track when the last touch event occurred
    const sessionStartHighScore = useRef(0);
    const hasTriggeredBest = useRef(false);

    // Game Logic Data (Mutable)
    // Fixed resolution logic: 800x400 always
    const gameData = useRef({
        // Physics
        gravity: 1, // 1 = down (floor), -1 = up (ceiling)
        playerY: 0,
        targetY: 0,
        // World
        speed: 0,
        distance: 0,
        obstacles: [],
        particles: [],
        stars: [],
        shake: 0,
        // Config
        topLaneY: 0,
        bottomLaneY: 0,
        lastTime: 0
    });

    // Load High Score
    useEffect(() => {
        const saved = localStorage.getItem('gravityFlipHighScore');
        if (saved) setHighScore(parseInt(saved, 10));
    }, []);

    // Save High Score & Check for New Best
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('gravityFlipHighScore', score.toString());
        }

        // Trigger New Best Popup
        if (gameState === 'PLAYING' && score > sessionStartHighScore.current && !hasTriggeredBest.current && sessionStartHighScore.current > 0) {
            hasTriggeredBest.current = true;
            setShowNewBest(true);

            if (!SoundManager.isMuted && SoundManager.ctx) {
                // Simple high pitch beep
                const ctx = SoundManager.ctx;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(SoundManager.masterGain);
                osc.frequency.setValueAtTime(800, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                osc.start();
                osc.stop(ctx.currentTime + 0.3);
            }

            // Hide after 2 seconds
            setTimeout(() => {
                setShowNewBest(false);
            }, 2000);
        }
    }, [score, highScore, gameState]);


    // --- INPUT HANDLER ---
    const handleInput = useCallback((e) => {
        const now = Date.now();

        // 1. Handle Touch Events
        if (e && e.type === 'touchstart') {
            if (e.cancelable) e.preventDefault(); // Stop scroll/zoom
            lastTouchTime.current = now; // Mark that a touch happened
        }

        // 2. Handle Click Events (Mouse or Synthetic)
        if (e && e.type === 'click') {
            // HYBRID FIX:
            // If a touch event happened recently (< 500ms), ignore this click.
            // This prevents "Ghost Clicks" on mobile where 1 tap = touchstart + click.
            if (now - lastTouchTime.current < 500) {
                return;
            }
        }

        // 3. Debounce (Prevent rapid-fire spamming)
        if (now - lastInputTime.current < 100) return;
        lastInputTime.current = now;

        if (gameState !== 'PLAYING') return;

        const data = gameData.current;
        data.gravity *= -1;
        SoundManager.playFlip();

        // Add flip particles
        for (let i = 0; i < 12; i++) {
            data.particles.push({
                x: 100,
                y: data.playerY,
                life: 1.0,
                vx: (Math.random() - 0.5) * 300 - 100,
                vy: (Math.random() - 0.5) * 300,
                color: '#38bdf8'
            });
        }
    }, [gameState]);

    // Keyboard Listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                e.preventDefault();
                handleInput({ type: 'keydown' }); // Pass mock event
                if (gameState !== 'PLAYING') startGame();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleInput, gameState]);


    // --- GAME LOOP ---
    const animate = useCallback((time) => {
        if (gameState !== 'PLAYING') return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const data = gameData.current;

        // Delta Time (clamped)
        const dt = Math.min((time - data.lastTime) / 1000, 0.05);
        data.lastTime = time;

        const width = canvas.width;
        const height = canvas.height;

        // Config Lanes
        data.topLaneY = height * 0.25;
        data.bottomLaneY = height * 0.75;


        // --- UPDATE ---

        // 1. Speed & Score
        data.speed += dt * 10;
        data.distance += data.speed * dt;
        setScore(Math.floor(data.distance / 10));

        // Screen shake decay
        if (data.shake > 0) data.shake *= 0.9;
        if (data.shake < 0.5) data.shake = 0;

        // 2. Player Physics
        data.targetY = data.gravity === 1 ? data.bottomLaneY : data.topLaneY;

        // Smooth "spring" interpolation
        const yDiff = data.targetY - data.playerY;
        data.playerY += yDiff * 20 * dt;

        // Snap to lane if very close (prevents micro-jitter)
        if (Math.abs(yDiff) < 1) data.playerY = data.targetY;

        // 3. Spawn Obstacles
        if (Math.random() < 0.015 + (data.speed * 0.00005)) {
            const lane = Math.random() > 0.5 ? 'top' : 'bottom';
            const startX = width + 100;
            const obsY = lane === 'top' ? data.topLaneY : data.bottomLaneY;

            // Prevent impossible overlapping walls
            // Ensure gap is passable based on player speed
            const minGap = 250 + (data.speed * 0.1);
            const tooClose = data.obstacles.some(o => Math.abs(o.x - startX) < minGap);

            if (!tooClose) {
                const obsW = 40 + Math.random() * 40;
                const obsH = 40;

                let yPos = obsY;
                if (lane === 'top') yPos = obsY + 20;
                else yPos = obsY - 20;

                data.obstacles.push({
                    x: startX,
                    y: yPos,
                    w: obsW,
                    h: obsH,
                    lane
                });
            }
        }

        // 4. Update Obstacles & Collision
        // Hitbox padding (The "Forgiveness" Factor)
        const hitPadX = 6;
        const hitPadY = 6;

        for (let i = data.obstacles.length - 1; i >= 0; i--) {
            let obs = data.obstacles[i];
            obs.x -= data.speed * dt;

            // Remove off-screen
            if (obs.x + obs.w < -100) {
                data.obstacles.splice(i, 1);
                continue;
            }

            // COLLISION - CENTER TO CENTER AABB
            const pW = 30;
            const pH = 20;
            const pX = 100;
            const pY = data.playerY;

            const oX = obs.x;
            const oY = obs.y;
            const oW = obs.w;
            const oH = obs.h;

            const pHW = pW / 2;
            const pHH = pH / 2;
            const oHW = oW / 2;
            const oHH = oH / 2;

            if (
                pX + pHW - hitPadX > oX - oHW &&     // Player Right > Obs Left
                pX - pHW + hitPadX < oX + oHW &&     // Player Left < Obs Right
                pY + pHH - hitPadY > oY - oHH &&     // Player Bot > Obs Top
                pY - pHH + hitPadY < oY + oHH        // Player Top < Obs Bot
            ) {
                // Shake and Die
                data.shake = 20;
                SoundManager.playGameOver();
                setGameState('GAME_OVER');
                return;
            }
        }

        // 5. Particles
        if (gameState === 'PLAYING') {
            // Engine Trail
            data.particles.push({
                x: 100 - 15,
                y: data.playerY,
                life: 1.0,
                vx: -data.speed * 0.8,
                color: '#38bdf8'
            });
        }

        for (let i = data.particles.length - 1; i >= 0; i--) {
            let p = data.particles[i];
            p.life -= dt * 3;
            p.x += p.vx * dt;
            p.y += (p.vy || 0) * dt;
            if (p.life <= 0) data.particles.splice(i, 1);
        }

        // 6. Background
        if (Math.random() < 0.2) {
            data.stars.push({
                x: width,
                y: Math.random() * height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5 + 0.1
            });
        }
        for (let i = data.stars.length - 1; i >= 0; i--) {
            let s = data.stars[i];
            s.x -= data.speed * s.speed * dt;
            if (s.x < 0) data.stars.splice(i, 1);
        }


        // --- DRAW ---
        ctx.save();

        // Screen Shake Apply
        if (data.shake > 0) {
            const dx = (Math.random() - 0.5) * data.shake;
            const dy = (Math.random() - 0.5) * data.shake;
            ctx.translate(dx, dy);
        }

        ctx.fillStyle = '#09090b';
        ctx.fillRect(0, 0, width, height);

        // 0. Stars
        ctx.fillStyle = '#fff';
        data.stars.forEach(s => {
            ctx.globalAlpha = 0.3 * s.speed;
            ctx.fillRect(s.x, s.y, s.size, s.size);
        });
        ctx.globalAlpha = 1;

        // 1. Lanes
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';

        [data.topLaneY, data.bottomLaneY].forEach(y => {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        });

        // Vertical Grid
        const gridOffset = (data.distance % 100);
        for (let x = width - gridOffset; x > 0; x -= 100) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        ctx.shadowBlur = 0;


        // 2. Obstacles
        ctx.fillStyle = '#ec4899';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ec4899';

        data.obstacles.forEach(obs => {
            ctx.fillRect(obs.x - obs.w / 2, obs.y - obs.h / 2, obs.w, obs.h);
            // Detail
            ctx.fillStyle = '#fff';
            ctx.globalAlpha = 0.5;
            ctx.fillRect(obs.x - obs.w / 2, obs.y - obs.h / 2, 4, obs.h);
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#ec4899';
        });
        ctx.shadowBlur = 0;


        // 3. Particles
        data.particles.forEach(p => {
            ctx.fillStyle = p.color || `rgba(56, 189, 248, ${p.life})`;
            ctx.globalAlpha = p.life;
            ctx.fillRect(p.x, p.y - 1, 3, 3);
        });
        ctx.globalAlpha = 1;


        // 4. Player
        const pX = 100;
        const pY = data.playerY;

        ctx.save();
        ctx.translate(pX, pY);

        const velocity = (data.targetY - data.playerY) * 0.05;
        ctx.rotate(velocity * 0.01);

        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#38bdf8';

        ctx.beginPath();
        if (data.gravity === 1) {
            ctx.moveTo(15, 10);
            ctx.lineTo(-15, 10);
            ctx.lineTo(-10, -10);
            ctx.lineTo(5, -10);
        } else {
            ctx.moveTo(15, -10);
            ctx.lineTo(-15, -10);
            ctx.lineTo(-10, 10);
            ctx.lineTo(5, 10);
        }
        ctx.fill();

        // Engine
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#fff';
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(-15, 0, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        ctx.restore(); // Restore shake


        requestRef.current = requestAnimationFrame(() => animate(Date.now()));

    }, [gameState]);


    // Handlers
    const startGame = (e) => {
        // We can reuse handleInput logic or just pass a dummy event.
        if (e && e.cancelable && e.type === 'touchstart') e.preventDefault();

        SoundManager.init();

        // Reset New Best State
        sessionStartHighScore.current = highScore;
        hasTriggeredBest.current = false;
        setShowNewBest(false);

        gameData.current = {
            gravity: 1,
            playerY: 150,
            targetY: 150,
            velocityY: 0,
            speed: 400,
            distance: 0,
            obstacles: [],
            particles: [],
            stars: [],
            shake: 0,
            topLaneY: 0,
            bottomLaneY: 0,
            lastTime: Date.now()
        };

        setScore(0);
        setGameState('PLAYING');
    };

    const resetHighScore = (e) => {
        e.stopPropagation();
        localStorage.removeItem('gravityFlipHighScore');
        setHighScore(0);
        sessionStartHighScore.current = 0;
    };

    // Lifecycle
    useEffect(() => {
        if (gameState === 'PLAYING') {
            gameData.current.lastTime = Date.now();
            requestRef.current = requestAnimationFrame(() => animate(Date.now()));
        } else {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [gameState, animate]);


    return (
        <div className="w-full h-full flex flex-col">


            {/* HEADER (MOBILE HUD) - Only visible on small screens */}
            <div className="flex md:hidden justify-between items-center px-4 py-2 bg-black/50 backdrop-blur-md rounded-t-xl sm:rounded-none select-none border-b border-white/5">
                {/* Distance */}
                <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Distance</span>
                    <span className="text-xl font-black text-white italic tracking-tighter tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white">
                        {score.toString().padStart(6, '0')}
                    </span>
                </div>

                {/* Right Side: Best & Mute */}
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end cursor-pointer" onClick={resetHighScore} title="Click to reset best score">
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1">
                            <HiTrophy className="text-yellow-500 w-3 h-3" /> Best
                        </span>
                        <span className="text-sm font-bold text-gray-400 tabular-nums">
                            {highScore.toString().padStart(6, '0')}
                        </span>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (SoundManager.isMuted) SoundManager.init();
                            const muted = SoundManager.toggleMute();
                            setIsMuted(muted);
                        }}
                        className="pointer-events-auto p-2 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-full text-white transition-colors"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <HiSpeakerXMark className="w-4 h-4" /> : <HiSpeakerWave className="w-4 h-4" />}
                    </button>
                </div>
            </div>


            {/* GAME CANVAS CONTAINER */}
            <div
                className="w-full aspect-[2/1] bg-black/90 relative rounded-b-xl md:rounded-xl overflow-hidden border border-white/10 group select-none shadow-2xl flex items-center justify-center touch-none cursor-pointer"
                onClick={handleInput}
                onTouchStart={handleInput}
            >
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={400}
                    className="w-full h-full block"
                />

                {/* DESKTOP HUD - Only visible on MD+ screens */}
                <div className="hidden md:flex absolute top-[5%] left-[5%] pointer-events-none flex-col z-20">
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Distance</span>
                    <span className="text-3xl font-black text-white italic tracking-tighter tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white">
                        {score.toString().padStart(6, '0')}
                    </span>
                </div>

                <div className="hidden md:flex absolute top-[5%] right-[5%] pointer-events-none flex-col items-end z-20">
                    <div className="pointer-events-auto cursor-pointer flex flex-col items-end" onClick={resetHighScore} title="Click to reset best score">
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1">
                            <HiTrophy className="text-yellow-500" /> Best
                        </span>
                        <span className="text-xl font-bold text-gray-400 tabular-nums mb-2">
                            {highScore.toString().padStart(6, '0')}
                        </span>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (SoundManager.isMuted) SoundManager.init();
                            const muted = SoundManager.toggleMute();
                            setIsMuted(muted);
                        }}
                        className="pointer-events-auto p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <HiSpeakerXMark className="w-6 h-6" /> : <HiSpeakerWave className="w-6 h-6" />}
                    </button>
                </div>

                {/* MENUS (Overlay on Canvas) */}
                <AnimatePresence>
                    {gameState === 'MENU' && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30 pointer-events-auto"
                        >
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-2 uppercase italic tracking-tighter transform -skew-x-6">
                                Gravity <span className="text-sky-400">Flip</span>
                            </h2>
                            <div className="flex gap-4 md:gap-8 text-[10px] md:text-xs text-gray-400 font-mono mb-4 md:mb-8 uppercase tracking-widest">
                                <span className="hidden md:flex items-center gap-2"><span className="w-4 h-4 border border-white/20 rounded flex items-center justify-center">␣</span> Space</span>
                                <span className="flex items-center gap-2"><span className="w-4 h-4 border border-white/20 rounded flex items-center justify-center">👆</span> Tap / Click</span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    startGame(e);
                                }}
                                onTouchStart={(e) => {
                                    e.stopPropagation();
                                    startGame(e);
                                }}
                                className="group relative px-6 py-2 md:px-8 md:py-3 bg-white text-black font-black uppercase tracking-widest overflow-hidden hover:scale-105 transition-transform rounded-full text-xs md:text-base"
                            >
                                <span className="relative z-10 flex items-center gap-2"><HiPlay /> Initiate Run</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </motion.div>
                    )}

                    {gameState === 'GAME_OVER' && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-red-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 pointer-events-auto"
                        >
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tighter">TERMINATED</h2>
                            <div className="text-white/60 text-sm md:text-lg mb-4 md:mb-8 font-mono">
                                Final Distance: <span className="text-white font-bold text-lg md:text-2xl ml-2">{score}</span>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    startGame(e);
                                }}
                                onTouchStart={(e) => {
                                    e.stopPropagation();
                                    startGame(e);
                                }}
                                className="px-6 py-2 md:px-8 md:py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-2 rounded-full text-xs md:text-base"
                            >
                                <HiArrowPath /> Retry
                            </button>
                        </motion.div>
                    )}

                    {/* NEW BEST SCORE POPUP */}
                    {showNewBest && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 1.5, opacity: 0, y: -50 }}
                            className="absolute top-1/4 left-0 right-0 flex justify-center items-center z-40 pointer-events-none"
                        >
                            <div className="bg-yellow-500 text-black font-black text-2xl md:text-4xl px-6 py-3 rounded-full shadow-lg transform -rotate-6 border-4 border-white">
                                NEW BEST!
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Speed Lines Overlay */}
                {gameState === 'PLAYING' && (
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                )}

            </div>
        </div>
    );
};

export default GravityFlipGame;
