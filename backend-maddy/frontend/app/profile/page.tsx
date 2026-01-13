'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AchievementBadge from '@/components/AchievementBadge';
import { mockUser, mockBadges } from '@/data/mockData';
import { formatCurrency, formatDate, truncateHash } from '@/lib/utils';
import { api } from '@/lib/api';

type TabType = 'overview' | 'badges' | 'history' | 'messages';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [user, setUser] = useState(mockUser);
    const [userAddress, setUserAddress] = useState<string>('0xUser...'); // Default to mock user
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUserData() {
            let address = '0xUser...';
            // Try to get real address
            if (typeof window !== 'undefined' && (window as any).ethereum) {
                try {
                    const { ethers } = await import('ethers');
                    const provider = new ethers.BrowserProvider((window as any).ethereum);
                    const accounts = await provider.listAccounts();
                    if (accounts.length > 0) {
                        address = accounts[0].address;
                        setUserAddress(truncateHash(address));
                    }
                } catch (e) {
                    console.warn("Wallet not connected, using demo user");
                }
            }

            // Get Stats
            const stats = await api.getUserStats(address);
            if (stats.totalDonated > 0 || stats.donations.length > 0) {
                // Calculate Badges based on logic
                const newBadges = [...mockBadges];
                if (stats.totalDonated >= 5) newBadges.find(b => b.id === '1')!.isEarned = true; // First Donation
                if (stats.totalDonated >= 100) newBadges.find(b => b.id === '2')!.isEarned = true; // Generous
                if (stats.campaignsSupported >= 3) newBadges.find(b => b.id === '3')!.isEarned = true; // Supporter

                setUser(prev => ({
                    ...prev,
                    name: address === '0xUser...' ? 'Demo User' : truncateHash(address),
                    totalDonated: stats.totalDonated,
                    campaignsSupported: stats.campaignsSupported,
                    donationHistory: stats.donations.map((d: any, i: number) => ({
                        id: i.toString(),
                        campaignId: d.campaignId,
                        campaignName: d.campaignTitle,
                        amount: d.amount,
                        date: d.timestamp,
                        status: 'completed',
                        transactionHash: d.txHash
                    })),
                    badges: newBadges.filter(b => b.isEarned)
                }));
            }
            setIsLoading(false);
        }

        fetchUserData();
    }, []);

    // ... (keep render logic similar but use 'user' state)

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
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] flex items-center justify-center text-4xl shadow-lg ring-4 ring-white">
                            👤
                        </div>

                        {/* Info */}
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
                                {user.name}
                            </h1>
                            <p className="text-[var(--text-secondary)] mb-4">
                                {userAddress !== '0xUser...' ? 'Wallet Connected' : 'Demo Account'}
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                {user.badges.slice(0, 4).map((badge) => (
                                    <span key={badge.id} className="text-2xl hover:scale-110 transition-transform cursor-help" title={badge.name}>
                                        {badge.icon}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="md:ml-auto flex gap-6">
                            <div className="text-center bg-white p-4 rounded-xl shadow-soft">
                                <p className="text-3xl font-bold text-[var(--accent)]">{formatCurrency(user.totalDonated)}</p>
                                <p className="text-sm text-[var(--text-secondary)]">Total Donated</p>
                            </div>
                            <div className="text-center bg-white p-4 rounded-xl shadow-soft">
                                <p className="text-3xl font-bold text-[var(--text-primary)]">#{user.rank}</p>
                                <p className="text-sm text-[var(--text-secondary)]">Global Rank</p>
                            </div>
                            <div className="text-center bg-white p-4 rounded-xl shadow-soft">
                                <p className="text-3xl font-bold text-[var(--success)]">{user.campaignsSupported}</p>
                                <p className="text-sm text-[var(--text-secondary)]">Campaigns</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tab Navigation */}
            <section className="border-b border-[var(--beige-300)] bg-white sticky top-16 md:top-20 z-10 transition-shadow transition-all shadow-sm">
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
                                        <span className="text-4xl font-bold text-[var(--accent)]">{user.impactScore.toLocaleString()}</span>
                                        <span className="text-[var(--success)] text-sm font-medium pb-1">Points</span>
                                    </div>
                                    <div className="h-2 bg-[var(--beige-200)] rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--success)]"
                                            initial={{ width: 0 }}
                                            animate={{ width: '70%' }} // Static for MVP
                                            transition={{ duration: 1 }}
                                        />
                                    </div>
                                    <p className="text-xs text-[var(--text-secondary)] mt-2">Points grow with every donation!</p>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-white rounded-2xl p-6 shadow-soft border border-[var(--card-border)]">
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Recent Activity</h3>
                                    <div className="space-y-3">
                                        {user.donationHistory.length > 0 ? user.donationHistory.slice(0, 3).map((donation) => (
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
                                        )) : (
                                            <p className="text-[var(--text-secondary)]">No donations yet.</p>
                                        )}
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
                                            {user.badges.length} earned
                                        </p>
                                    </div>
                                </div>

                                {/* Earned Badges */}
                                <div className="mb-8">
                                    <h3 className="font-bold text-[var(--text-primary)] mb-4">Earned</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
                                        {user.badges.length > 0 ? user.badges.map((badge) => (
                                            <AchievementBadge key={badge.id} badge={badge} size="md" />
                                        )) : <p className="text-[var(--text-secondary)] col-span-full">No badges yet. Start donating!</p>}
                                    </div>
                                </div>

                                {/* Show all possible badges opacity 50? For MVP just showing earned */}
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
                                            {user.donationHistory.length > 0 ? user.donationHistory.map((donation) => (
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
                                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium bg-[var(--success)]/10 text-[var(--success)]`}>
                                                            {donation.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-8 text-center text-[var(--text-secondary)]">
                                                        No history found.
                                                    </td>
                                                </tr>
                                            )}
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
                                    {/* Default Welcome Message */}
                                    <div className="border border-[var(--beige-300)] rounded-xl p-6 bg-[var(--beige-100)]">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-2xl flex-shrink-0">
                                                💖
                                            </div>
                                            <div>
                                                <p className="font-bold text-[var(--text-primary)] mb-1">Welcome to HeartChain!</p>
                                                <p className="text-sm text-[var(--text-secondary)] mb-3">
                                                    Thank you for joining our community of givers. Your journey to making the world a better place starts here.
                                                </p>
                                                <p className="text-xs text-[var(--text-secondary)]">From: HeartChain Team</p>
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
