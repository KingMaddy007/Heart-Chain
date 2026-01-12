'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AchievementBadge from '@/components/AchievementBadge';
import { mockUser, mockBadges } from '@/data/mockData';
import { formatCurrency, formatDate, truncateHash } from '@/lib/utils';

type TabType = 'overview' | 'badges' | 'history' | 'messages';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    return (
        <div className="min-h-screen bg-[var(--beige-100)]">
            {/* Profile Header */}
            <section className="bg-gradient-to-b from-[var(--beige-200)] to-[var(--beige-100)] py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="flex flex-col md:flex-row items-center gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] flex items-center justify-center text-4xl shadow-lg">
                            👤
                        </div>

                        {/* Info */}
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
                                {mockUser.name}
                            </h1>
                            <p className="text-[var(--text-secondary)] mb-4">
                                Member since January 2024
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                {mockUser.badges.slice(0, 4).map((badge) => (
                                    <span key={badge.id} className="text-2xl" title={badge.name}>
                                        {badge.icon}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="md:ml-auto flex gap-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-[var(--accent)]">{formatCurrency(mockUser.totalDonated)}</p>
                                <p className="text-sm text-[var(--text-secondary)]">Total Donated</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-[var(--text-primary)]">#{mockUser.rank}</p>
                                <p className="text-sm text-[var(--text-secondary)]">Rank</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-[var(--success)]">{mockUser.campaignsSupported}</p>
                                <p className="text-sm text-[var(--text-secondary)]">Campaigns</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tab Navigation */}
            <section className="border-b border-[var(--beige-300)] bg-white sticky top-16 md:top-20 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-1 overflow-x-auto">
                        {(['overview', 'badges', 'history', 'messages'] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 font-medium capitalize whitespace-nowrap border-b-2 transition-all ${activeTab === tab
                                        ? 'border-[var(--accent)] text-[var(--accent)]'
                                        : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tab Content */}
            <section className="py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Impact Score Card */}
                                <div className="bg-white rounded-2xl p-6 shadow-soft border border-[var(--card-border)]">
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Impact Score</h3>
                                    <div className="flex items-end gap-2 mb-4">
                                        <span className="text-4xl font-bold text-[var(--accent)]">{mockUser.impactScore.toLocaleString()}</span>
                                        <span className="text-[var(--success)] text-sm font-medium pb-1">+250 this week</span>
                                    </div>
                                    <div className="h-2 bg-[var(--beige-200)] rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--success)]"
                                            initial={{ width: 0 }}
                                            animate={{ width: '72%' }}
                                            transition={{ duration: 1 }}
                                        />
                                    </div>
                                    <p className="text-xs text-[var(--text-secondary)] mt-2">28% to next level</p>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-white rounded-2xl p-6 shadow-soft border border-[var(--card-border)]">
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Recent Activity</h3>
                                    <div className="space-y-3">
                                        {mockUser.donationHistory.slice(0, 3).map((donation) => (
                                            <div key={donation.id} className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[var(--beige-200)] flex items-center justify-center text-sm">
                                                    💝
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-[var(--text-primary)] truncate">{donation.campaignName}</p>
                                                    <p className="text-xs text-[var(--text-secondary)]">{formatDate(donation.date)}</p>
                                                </div>
                                                <span className="font-medium text-[var(--accent)]">{formatCurrency(donation.amount)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white rounded-2xl p-6 shadow-soft border border-[var(--card-border)]">
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <Link href="/campaigns" className="flex items-center gap-3 p-3 bg-[var(--beige-100)] rounded-xl hover:bg-[var(--beige-200)] transition-colors">
                                            <span className="text-xl">🔍</span>
                                            <span className="font-medium text-[var(--text-primary)]">Browse Campaigns</span>
                                        </Link>
                                        <Link href="/create" className="flex items-center gap-3 p-3 bg-[var(--beige-100)] rounded-xl hover:bg-[var(--beige-200)] transition-colors">
                                            <span className="text-xl">🚀</span>
                                            <span className="font-medium text-[var(--text-primary)]">Start a Campaign</span>
                                        </Link>
                                        <Link href="/leaderboards" className="flex items-center gap-3 p-3 bg-[var(--beige-100)] rounded-xl hover:bg-[var(--beige-200)] transition-colors">
                                            <span className="text-xl">🏆</span>
                                            <span className="font-medium text-[var(--text-primary)]">View Leaderboard</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Badges Tab */}
                        {activeTab === 'badges' && (
                            <div className="bg-white rounded-2xl p-8 shadow-soft border border-[var(--card-border)]">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Achievement Badges</h2>
                                        <p className="text-[var(--text-secondary)]">
                                            {mockUser.badges.length} of {mockBadges.length} badges earned
                                        </p>
                                    </div>
                                </div>

                                {/* Earned Badges */}
                                <div className="mb-8">
                                    <h3 className="font-bold text-[var(--text-primary)] mb-4">Earned ({mockUser.badges.length})</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
                                        {mockBadges.filter(b => b.isEarned).map((badge) => (
                                            <AchievementBadge key={badge.id} badge={badge} size="md" />
                                        ))}
                                    </div>
                                </div>

                                {/* Locked Badges */}
                                <div>
                                    <h3 className="font-bold text-[var(--text-primary)] mb-4">Locked ({mockBadges.filter(b => !b.isEarned).length})</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
                                        {mockBadges.filter(b => !b.isEarned).map((badge) => (
                                            <AchievementBadge key={badge.id} badge={badge} size="md" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* History Tab */}
                        {activeTab === 'history' && (
                            <div className="bg-white rounded-2xl shadow-soft border border-[var(--card-border)] overflow-hidden">
                                <div className="p-6 border-b border-[var(--beige-200)]">
                                    <h2 className="text-xl font-bold text-[var(--text-primary)]">Donation History</h2>
                                </div>

                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-[var(--beige-100)]">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Campaign</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Amount</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Transaction</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[var(--beige-200)]">
                                            {mockUser.donationHistory.map((donation) => (
                                                <tr key={donation.id} className="hover:bg-[var(--beige-100)]">
                                                    <td className="px-6 py-4">
                                                        <Link href={`/campaigns/${donation.campaignId}`} className="font-medium text-[var(--text-primary)] hover:text-[var(--accent)]">
                                                            {donation.campaignName}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 font-bold text-[var(--accent)]">
                                                        {formatCurrency(donation.amount)}
                                                    </td>
                                                    <td className="px-6 py-4 text-[var(--text-secondary)]">
                                                        {formatDate(donation.date)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="font-mono text-sm text-[var(--text-secondary)]">
                                                            {truncateHash(donation.transactionHash)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${donation.status === 'completed'
                                                                ? 'bg-[var(--success)]/10 text-[var(--success)]'
                                                                : 'bg-amber-100 text-amber-700'
                                                            }`}>
                                                            {donation.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Messages Tab */}
                        {activeTab === 'messages' && (
                            <div className="bg-white rounded-2xl p-8 shadow-soft border border-[var(--card-border)]">
                                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Heartwarming Messages</h2>

                                <div className="space-y-4">
                                    {/* Sample Impact Message */}
                                    <div className="border border-[var(--beige-300)] rounded-xl p-6 bg-[var(--beige-100)]">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-2xl flex-shrink-0">
                                                💖
                                            </div>
                                            <div>
                                                <p className="font-bold text-[var(--text-primary)] mb-1">Thank you from Sarah&apos;s family!</p>
                                                <p className="text-sm text-[var(--text-secondary)] mb-3">
                                                    &quot;Your generous donation helped us reach our goal for Sarah&apos;s heart surgery. We are forever grateful. Sarah is now recovering well and sends her love!&quot;
                                                </p>
                                                <p className="text-xs text-[var(--text-secondary)]">From: Sarah&apos;s Heart Surgery Fund • 2 days ago</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-[var(--beige-300)] rounded-xl p-6 bg-[var(--beige-100)]">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-[var(--success)]/10 flex items-center justify-center text-2xl flex-shrink-0">
                                                🎉
                                            </div>
                                            <div>
                                                <p className="font-bold text-[var(--text-primary)] mb-1">Campaign Milestone Reached!</p>
                                                <p className="text-sm text-[var(--text-secondary)] mb-3">
                                                    The Earthquake Relief Fund you supported has reached 75% of its goal! Your impact is making a real difference for families in need.
                                                </p>
                                                <p className="text-xs text-[var(--text-secondary)]">From: Global Relief Network • 5 days ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
