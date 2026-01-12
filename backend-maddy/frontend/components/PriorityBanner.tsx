'use client';

import { motion } from 'framer-motion';

interface PriorityBannerProps {
    daysLeft: number;
    className?: string;
}

export default function PriorityBanner({ daysLeft, className = '' }: PriorityBannerProps) {
    return (
        <motion.div
            className={`relative overflow-hidden rounded-xl ${className}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--urgent)] via-[var(--urgent-light)] to-[var(--urgent)] bg-[length:200%_100%] animate-shimmer" />

            {/* Content */}
            <div className="relative flex items-center justify-center gap-3 py-3 px-4">
                {/* Pulsing Icon */}
                <motion.span
                    className="text-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    🔥
                </motion.span>

                {/* Text */}
                <span className="text-white font-bold text-sm md:text-base">
                    URGENT: Only {daysLeft} day{daysLeft !== 1 ? 's' : ''} left to donate!
                </span>

                {/* Timer Icon */}
                <motion.div
                    className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-white text-xs font-medium">
                        {daysLeft}d
                    </span>
                </motion.div>
            </div>

            {/* Shine Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
        </motion.div>
    );
}
