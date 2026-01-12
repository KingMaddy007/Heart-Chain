'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/data/mockData';
import { rarityColors } from '@/lib/utils';

interface AchievementBadgeProps {
    badge: Badge;
    size?: 'sm' | 'md' | 'lg';
    showDetails?: boolean;
}

export default function AchievementBadge({ badge, size = 'md', showDetails = true }: AchievementBadgeProps) {
    const sizeMap = {
        sm: { container: 'w-16 h-16', icon: 'text-2xl', text: 'text-xs' },
        md: { container: 'w-24 h-24', icon: 'text-4xl', text: 'text-sm' },
        lg: { container: 'w-32 h-32', icon: 'text-5xl', text: 'text-base' },
    };

    const { container, icon, text } = sizeMap[size];
    const colors = rarityColors[badge.rarity];

    return (
        <motion.div
            className="group relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div
                className={`${container} rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${badge.isEarned
                        ? `${colors.bg} border-2 ${colors.border} shadow-lg`
                        : 'bg-gray-100 border-2 border-gray-200 grayscale opacity-50'
                    }`}
            >
                {/* Glow Effect for Earned Badges */}
                {badge.isEarned && (
                    <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            boxShadow: badge.rarity === 'legendary'
                                ? '0 0 30px rgba(255, 215, 0, 0.4)'
                                : badge.rarity === 'epic'
                                    ? '0 0 20px rgba(147, 51, 234, 0.3)'
                                    : '0 0 15px rgba(139, 69, 19, 0.2)',
                        }}
                    />
                )}

                {/* Badge Icon */}
                <span className={`${icon} ${badge.isEarned ? '' : 'grayscale'}`}>
                    {badge.icon}
                </span>

                {/* Lock Icon for Unearned */}
                {!badge.isEarned && (
                    <div className="absolute top-1 right-1">
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Badge Name */}
            {showDetails && (
                <p className={`mt-2 ${text} font-medium text-center ${badge.isEarned ? 'text-[var(--text-primary)]' : 'text-gray-400'}`}>
                    {badge.name}
                </p>
            )}

            {/* Hover Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <div className="bg-[var(--text-primary)] text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                    <p className="font-bold">{badge.name}</p>
                    <p className="text-gray-300">{badge.description}</p>
                    {badge.isEarned && badge.earnedAt && (
                        <p className="text-gray-400 mt-1">Earned: {new Date(badge.earnedAt).toLocaleDateString()}</p>
                    )}
                    <p className={`mt-1 capitalize ${badge.rarity === 'legendary' ? 'text-amber-400' :
                            badge.rarity === 'epic' ? 'text-purple-400' :
                                badge.rarity === 'rare' ? 'text-blue-400' : 'text-gray-400'
                        }`}>
                        {badge.rarity}
                    </p>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--text-primary)]" />
            </div>

            {/* Share Button for Earned Badges */}
            {badge.isEarned && showDetails && (
                <button className="absolute -top-2 -right-2 w-6 h-6 bg-[#0A66C2] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-[#094d8e]">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </button>
            )}
        </motion.div>
    );
}
