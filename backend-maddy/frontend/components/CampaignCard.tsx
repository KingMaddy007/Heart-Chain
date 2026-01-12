'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import HeartProgressBar from './HeartProgressBar';
import { Campaign, categoryLabels, categoryColors } from '@/data/mockData';
import { formatCurrency, calculatePercentage, getDaysRemainingText } from '@/lib/utils';

interface CampaignCardProps {
    campaign: Campaign;
    index?: number;
}

export default function CampaignCard({ campaign, index = 0 }: CampaignCardProps) {
    const percentage = calculatePercentage(campaign.raised, campaign.goal);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group"
        >
            <Link href={`/campaigns/${campaign.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-[var(--card-border)]">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                        <div
                            className="w-full h-full bg-gradient-to-br from-[var(--beige-300)] to-[var(--beige-400)]"
                            style={{
                                backgroundImage: `url(${campaign.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />

                        {/* Category Badge */}
                        <div
                            className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-medium"
                            style={{ backgroundColor: categoryColors[campaign.category] }}
                        >
                            {categoryLabels[campaign.category]}
                        </div>

                        {/* High Priority Badge */}
                        {campaign.isHighPriority && (
                            <motion.div
                                className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r from-[var(--urgent)] to-[var(--urgent-light)] animate-urgent-pulse"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                🔥 URGENT
                            </motion.div>
                        )}

                        {/* Verified Badge */}
                        {campaign.isVerified && (
                            <div className="absolute bottom-3 right-3 w-6 h-6 bg-[var(--success)] rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}

                        {/* Mini Heart Progress - Overlay */}
                        <div className="absolute bottom-3 left-3">
                            <HeartProgressBar percentage={percentage} size="sm" showPercentage={false} animated={false} />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                        {/* Title */}
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 line-clamp-1 group-hover:text-[var(--accent)] transition-colors">
                            {campaign.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                            {campaign.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="mb-3">
                            <div className="h-2 bg-[var(--beige-200)] rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                />
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center justify-between text-sm">
                            <div>
                                <span className="font-bold text-[var(--accent)]">{formatCurrency(campaign.raised)}</span>
                                <span className="text-[var(--text-secondary)]"> of {formatCurrency(campaign.goal)}</span>
                            </div>
                            <span className="text-[var(--text-secondary)] font-medium">{percentage}%</span>
                        </div>

                        {/* Footer Row */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--beige-200)]">
                            {/* Days Left */}
                            <div className="flex items-center gap-1 text-sm">
                                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className={`font-medium ${campaign.daysLeft <= 7 ? 'text-[var(--urgent)]' : 'text-[var(--text-secondary)]'}`}>
                                    {getDaysRemainingText(campaign.daysLeft)}
                                </span>
                            </div>

                            {/* Contributors */}
                            <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span>{campaign.contributors.toLocaleString()} donors</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
