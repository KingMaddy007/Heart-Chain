'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HeartProgressBarProps {
    percentage: number;
    size?: 'sm' | 'md' | 'lg';
    showPercentage?: boolean;
    animated?: boolean;
    className?: string;
}

export default function HeartProgressBar({
    percentage,
    size = 'md',
    showPercentage = true,
    animated = true,
    className = '',
}: HeartProgressBarProps) {
    const [displayPercentage, setDisplayPercentage] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    const sizeMap = {
        sm: { width: 60, height: 55, fontSize: 'text-xs' },
        md: { width: 120, height: 110, fontSize: 'text-lg' },
        lg: { width: 200, height: 185, fontSize: 'text-3xl' },
    };

    const { width, height, fontSize } = sizeMap[size];

    useEffect(() => {
        if (animated) {
            const duration = 1500;
            const steps = 60;
            const start = displayPercentage; // Start from current visual state
            const end = percentage;
            const diff = end - start;

            if (diff === 0) return; // No change

            let stepCount = 0;

            const timer = setInterval(() => {
                stepCount++;
                const progress = stepCount / steps;
                // Ease out cubic
                const ease = 1 - Math.pow(1 - progress, 3);

                const current = start + (diff * ease);

                if (stepCount >= steps) {
                    setDisplayPercentage(end);
                    clearInterval(timer);
                    if (end >= 100) {
                        setShowConfetti(true);
                        setTimeout(() => setShowConfetti(false), 3000);
                    }
                } else {
                    setDisplayPercentage(Math.round(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        } else {
            setDisplayPercentage(percentage);
        }
    }, [percentage, animated]); // Removed displayPercentage from dependency to avoid loop

    const fillHeight = (displayPercentage / 100) * 100;

    return (
        <div className={`relative inline-block ${className}`} style={{ width, height }}>
            {/* Confetti Effect */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: ['#FF4B6E', '#FBBF24', '#10B981', '#60A5FA'][i % 4],
                                left: `${Math.random() * 100}%`,
                            }}
                            initial={{ y: height / 2, opacity: 1, scale: 0 }}
                            animate={{
                                y: [-20, -100],
                                x: [0, (Math.random() - 0.5) * 100],
                                opacity: [1, 0],
                                scale: [0, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                delay: Math.random() * 0.5,
                                ease: 'easeOut',
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Glowing Background for LG - Enhanced Aura */}
            {size === 'lg' && (
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240%] h-[240%] bg-pink-200/30 rounded-full blur-3xl -z-10 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(255, 75, 110, 0.15) 0%, rgba(255, 255, 255, 0) 70%)' }}
                />
            )}

            {/* Heart SVG */}
            <svg
                viewBox="0 0 32 29.6"
                width={width}
                height={height}
                className="drop-shadow-xl"
                style={{ overflow: 'visible' }}
            >
                <defs>
                    <linearGradient id={`heartFillGradient-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FF8FAB" /> {/* Lighter Pink Top */}
                        <stop offset="100%" stopColor="#FF4B6E" /> {/* Vibrant Pink Bottom */}
                    </linearGradient>
                    <clipPath id={`heartClip-${size}`}>
                        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" />
                    </clipPath>
                    <filter id="dropshadow" height="130%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                        <feOffset dx="0" dy="1" result="offsetblur" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.3" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Empty Heart Background (White/Gray) */}
                <path
                    d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                    fill="#F3F4F6"
                    className="stroke-white stroke-[0.5]"
                />

                {/* Fill Heart */}
                <g clipPath={`url(#heartClip-${size})`}>
                    <motion.rect
                        x="0"
                        width="32"
                        height="29.6"
                        fill={`url(#heartFillGradient-${size})`}
                        initial={{ y: 29.6 }}
                        animate={{ y: 29.6 - (fillHeight * 29.6) / 100 }}
                        transition={{ duration: animated ? 1.5 : 0, ease: 'easeOut' }}
                    />

                    {/* Liquid Line Indicator (White line at top of fill) */}
                    <motion.rect
                        x="0"
                        width="32"
                        height="0.4"
                        fill="rgba(255,255,255,0.6)"
                        initial={{ y: 29.6 }}
                        animate={{ y: 29.6 - (fillHeight * 29.6) / 100 }}
                        transition={{ duration: animated ? 1.5 : 0, ease: 'easeOut' }}
                    />
                </g>
            </svg>

            {/* Floating Badges for Large Size (Gamification) */}
            {size === 'lg' && (
                <>
                    {/* Trophy Badge (Top Right) */}
                    <div className="absolute top-[-20px] -right-16 bg-white p-2.5 rounded-2xl shadow-xl border border-orange-50 transform rotate-12 animate-float z-20">
                        <span className="text-2xl filter drop-shadow-sm">🏆</span>
                    </div>

                    {/* Donor Bubble (Bottom Right) */}
                    <div className="absolute -bottom-10 -right-24 bg-white px-4 py-3 rounded-2xl shadow-xl border border-gray-50 flex flex-col items-start animate-slide-up z-20 min-w-[120px]">
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Recent</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">+ ₹20,000</span>
                        <span className="text-[10px] text-gray-500">Divya P.</span>
                    </div>
                </>
            )}

            {/* Percentage Text */}
            {showPercentage && (
                <motion.div
                    className={`absolute inset-0 flex items-center justify-center ${fontSize} font-black tracking-tight drop-shadow-md z-10`}
                    style={{
                        color: displayPercentage > 45 ? '#FFFFFF' : '#FF4B6E',
                        textShadow: displayPercentage > 45 ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {displayPercentage}%
                </motion.div>
            )}
        </div>
    );
}
