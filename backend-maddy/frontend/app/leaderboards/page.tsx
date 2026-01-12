'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockLeaderboard, mockUser } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

type TabType = 'overall' | 'weekly' | 'monthly';

export default function LeaderboardsPage() {
    const [activeTab, setActiveTab] = useState<TabType>('overall');

    const getRankIcon = (rank: number) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return `#${rank}`;
    };

    const getRankStyle = (rank: number) => {
        if (rank === 1) return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
        if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800';
        if (rank === 3) return 'bg-gradient-to-r from-amber-600 to-amber-800 text-white';
        return 'bg-[var(--beige-200)] text-[var(--text-primary)]';
    };

    return (
        <div className="min-h-screen bg-[var(--beige-100)]">
            {/* Header */}
            <section className="bg-gradient-to-b from-[var(--beige-200)] to-[var(--beige-100)] py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                            🏆 Leaderboards
                        </h1>
                        <p className="text-[var(--text-secondary)] mb-8">
                            Celebrating our most generous donors making a difference.
                        </p>

                        {/* Tabs */}
                        <div className="inline-flex gap-1 bg-white p-1 rounded-xl shadow-soft">
                            {(['overall', 'weekly', 'monthly'] as TabType[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2.5 rounded-lg font-medium capitalize transition-all ${activeTab === tab
                                            ? 'bg-[var(--accent)] text-white'
                                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Your Position Card */}
            <section className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] rounded-2xl p-6 text-white shadow-soft-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl">
                                    👤
                                </div>
                                <div>
                                    <p className="text-white/80 text-sm">Your Position</p>
                                    <p className="text-2xl font-bold">#{mockUser.rank}</p>
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <div className="text-center">
                                    <p className="text-white/80 text-sm">Total Donated</p>
                                    <p className="text-xl font-bold">{formatCurrency(mockUser.totalDonated)}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-white/80 text-sm">Campaigns</p>
                                    <p className="text-xl font-bold">{mockUser.campaignsSupported}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-white/80 text-sm">Impact Score</p>
                                    <p className="text-xl font-bold">{mockUser.impactScore.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Leaderboard Table */}
            <section className="pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="bg-white rounded-2xl shadow-soft border border-[var(--card-border)] overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[var(--beige-100)] border-b border-[var(--card-border)] text-sm font-medium text-[var(--text-secondary)]">
                            <div className="col-span-1">Rank</div>
                            <div className="col-span-5">Donor</div>
                            <div className="col-span-3 text-right">Total Donated</div>
                            <div className="col-span-3 text-right">Campaigns</div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-[var(--beige-200)]">
                            {mockLeaderboard.map((entry, index) => (
                                <motion.div
                                    key={entry.userId}
                                    className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[var(--beige-100)] transition-colors ${entry.userId === mockUser.id ? 'bg-[var(--accent)]/5' : ''
                                        }`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                >
                                    {/* Rank */}
                                    <div className="col-span-1">
                                        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold ${getRankStyle(entry.rank)}`}>
                                            {getRankIcon(entry.rank)}
                                        </span>
                                    </div>

                                    {/* Donor Info */}
                                    <div className="col-span-5 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[var(--beige-200)] flex items-center justify-center">
                                            👤
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--text-primary)]">{entry.name}</p>
                                            <div className="flex gap-1">
                                                {entry.badges.map((badge, i) => (
                                                    <span key={i} className="text-sm">{badge}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Total Donated */}
                                    <div className="col-span-3 text-right">
                                        <span className="font-bold text-[var(--accent)]">{formatCurrency(entry.totalDonated)}</span>
                                    </div>

                                    {/* Campaigns */}
                                    <div className="col-span-3 text-right text-[var(--text-secondary)]">
                                        {entry.campaignsSupported} campaigns
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
