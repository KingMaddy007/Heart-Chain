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
                <div className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                    {/* Image Section */}
                    <div className="relative h-56 overflow-hidden">
                        <div
                            className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-700"
                            style={{
                                backgroundImage: `url(${campaign.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />

                        {/* Status Badge (Top Left) */}
                        {campaign.isHighPriority ? (
                            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider bg-orange-500 shadow-sm">
                                {campaign.priority === 'urgent' ? 'Urgent' : 'Critical'}
                            </div>
                        ) : (
                            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider bg-emerald-500 shadow-sm">
                                Active
                            </div>
                        )}

                        {/* Verified Badge (Top Right) */}
                        {campaign.isVerified && (
                            <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-emerald-500 text-white flex items-center gap-1 shadow-sm">
                                <span className="text-[10px] font-bold uppercase">Verified</span>
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}

                        {/* Heart Overlay (Bottom Right) */}
                        <div className="absolute bottom-4 right-4">
                            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center">
                                <div className="flex flex-col items-center">
                                    <svg className="w-4 h-4 text-[var(--primary)] fill-current" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                    <span className="text-[8px] font-bold text-[var(--primary)] leading-none mt-0.5">{percentage}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex flex-col flex-1">
                        {/* Category Label */}
                        <div className="mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">
                                {categoryLabels[campaign.category] || campaign.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-2 min-h-[3rem]">
                            {campaign.title}
                        </h3>

                        {/* Author/Creator */}
                        <div className="flex items-center gap-2 mb-4">
                            <p className="text-sm text-gray-500 line-clamp-1">
                                <span className="font-medium text-gray-700">{campaign.creatorName}</span>
                                <span className="opacity-60 mx-1">•</span>
                                <span className="opacity-80">Mumbai, MH</span>
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-2 mt-auto">
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-[var(--primary)] rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                />
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center justify-between text-sm mt-2">
                            <div>
                                <p className="font-bold text-gray-900 text-base">{formatCurrency(campaign.raised)}</p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wide">raised of {formatCurrency(campaign.goal)}</p>
                            </div>
                            <div className="text-right flex items-center gap-4">
                                <div className="flex items-center gap-1 text-gray-500">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="text-xs font-medium">{campaign.contributors}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className="text-xs font-medium">{campaign.daysLeft}d</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
