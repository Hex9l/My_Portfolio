import React, { useEffect, useRef } from 'react';

const HeroBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let points = [];
        const mouse = { x: -1000, y: -1000 };

        // Configuration
        const POINT_COUNT = 60; // Slightly fewer points for a cleaner look
        const CONNECTION_DISTANCE = 150;
        const MOUSE_DISTANCE = 200;
        const POINT_SPEED = 0.3;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initPoints();
        };

        const initPoints = () => {
            points = [];
            for (let i = 0; i < POINT_COUNT; i++) {
                points.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * POINT_SPEED,
                    vy: (Math.random() - 0.5) * POINT_SPEED,
                    originalX: 0, // placeholders
                    originalY: 0,
                });
            }
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

            // Update and draw points
            points.forEach((point, i) => {
                // Move points
                point.x += point.vx;
                point.y += point.vy;

                // Bounce off edges
                if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
                if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

                // Mouse interaction (Magnetic effect)
                const dx = mouse.x - point.x;
                const dy = mouse.y - point.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < MOUSE_DISTANCE) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (MOUSE_DISTANCE - distance) / MOUSE_DISTANCE;
                    const attractionStrength = 0.05; // Gentle pull

                    point.vx += forceDirectionX * force * attractionStrength;
                    point.vy += forceDirectionY * force * attractionStrength;
                }

                // Draw Point
                ctx.beginPath();
                ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'; // Faint white
                ctx.fill();
            });

            // Draw Connections
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < CONNECTION_DISTANCE) {
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);

                        // Opacity based on distance
                        const opacity = 1 - (distance / CONNECTION_DISTANCE);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`; // Very subtle lines
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        // Initialize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ background: 'transparent' }} // Let parent bg show through
        />
    );
    // Note: pointer-events-none is used because we're capturing mousemove on window, 
    // and we don't want the canvas to block interactions with buttons.
};

export default HeroBackground;
