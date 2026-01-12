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
            const increment = percentage / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= percentage) {
                    setDisplayPercentage(percentage);
                    clearInterval(timer);
                    if (percentage >= 100) {
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
    }, [percentage, animated]);

    const fillHeight = (displayPercentage / 100) * 100;

    return (
        <div className={`relative inline-block ${className}`} style={{ width, height }}>
            {/* Confetti Effect */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: ['#8B4513', '#CD5C5C', '#6B8E23', '#FFD700', '#E8DCC4'][i % 5],
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

            {/* Heart SVG */}
            <svg
                viewBox="0 0 32 29.6"
                width={width}
                height={height}
                className="drop-shadow-lg"
            >
                {/* Background Heart */}
                <defs>
                    <linearGradient id="heartGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#8B4513" />
                        <stop offset="50%" stopColor="#A0522D" />
                        <stop offset="100%" stopColor="#CD853F" />
                    </linearGradient>
                    <linearGradient id="heartBgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#E8DCC4" />
                        <stop offset="100%" stopColor="#D4C4A8" />
                    </linearGradient>
                    <clipPath id={`heartClip-${size}`}>
                        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" />
                    </clipPath>
                </defs>

                {/* Empty Heart Background */}
                <path
                    d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                    fill="url(#heartBgGradient)"
                    className="stroke-[#C4B298] stroke-1"
                />

                {/* Fill Heart */}
                <g clipPath={`url(#heartClip-${size})`}>
                    <motion.rect
                        x="0"
                        width="32"
                        height="29.6"
                        fill="url(#heartGradient)"
                        initial={{ y: 29.6 }}
                        animate={{ y: 29.6 - (fillHeight * 29.6) / 100 }}
                        transition={{ duration: animated ? 1.5 : 0, ease: 'easeOut' }}
                    />
                </g>

                {/* Heart Outline */}
                <path
                    d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                    fill="none"
                    className="stroke-[#8B4513] stroke-[0.5]"
                />
            </svg>

            {/* Percentage Text */}
            {showPercentage && (
                <motion.div
                    className={`absolute inset-0 flex items-center justify-center ${fontSize} font-bold`}
                    style={{ color: displayPercentage > 50 ? '#FFFEF7' : '#8B4513' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {displayPercentage}%
                </motion.div>
            )}

            {/* Pulse Animation on New Donation */}
            {animated && percentage > 0 && percentage < 100 && (
                <motion.div
                    className="absolute inset-0"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
            )}
        </div>
    );
}
