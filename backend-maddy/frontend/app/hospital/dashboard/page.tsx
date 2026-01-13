'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { api, MockCampaign } from '@/lib/api'; // Using MockCampaign type
import Link from 'next/link';

export default function HospitalDashboard() {
    const router = useRouter();
    const [hospitalId, setHospitalId] = useState('');
    const [campaigns, setCampaigns] = useState<MockCampaign[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        // Simple Session Check
        const session = sessionStorage.getItem('hospital_session');
        if (!session) {
            router.push('/hospital/login');
            return;
        }
        const { hospitalId } = JSON.parse(session);
        setHospitalId(hospitalId);

        // Fetch Data
        loadData(hospitalId);
    }, [router]);

    const loadData = async (hospId: string) => {
        setIsLoading(true);
        try {
            const data = await api.getHospitalCampaigns(hospId);
            setCampaigns(data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReleaseFunds = async (campaign: MockCampaign) => {
        if (!window.confirm(`Are you sure you want to verify and release funds for "${campaign.title}"? This action is irreversible.`)) return;

        setProcessingId(campaign.id);
        try {
            const result = await api.releaseFunds(campaign.id);
            if (result.success) {
                alert(`Funds Released Successfully!\n\nBlockchain Transaction Hash:\n${result.txHash}`);
                // Refresh Data
                loadData(hospitalId);
            } else {
                alert('Fund release failed. Please try again.');
            }
        } catch (e) {
            alert('An error occurred.');
        } finally {
            setProcessingId(null);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('hospital_session');
        router.push('/hospital/login');
    };

    return (
        <div className="min-h-screen bg-[var(--gray-50)]">
            {/* Header */}
            <header className="bg-white border-b border-[var(--gray-200)] px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-pink-100 p-2 rounded-lg text-2xl">🏥</div>
                    <div>
                        <h1 className="text-xl font-bold text-[var(--gray-900)]">Hospital Portal</h1>
                        <p className="text-xs text-[var(--text-secondary)]">ID: {hospitalId}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                >
                    Logout
                </button>
            </header>

            <main className="max-w-6xl mx-auto p-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[var(--gray-900)]">Pending Fund Releases</h2>
                    <p className="text-[var(--text-secondary)]">Review fully funded campaigns pending verification.</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : campaigns.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[var(--gray-200)]">
                        <div className="text-4xl mb-4">✅</div>
                        <h3 className="text-xl font-bold text-[var(--gray-900)]">All Caught Up!</h3>
                        <p className="text-[var(--text-secondary)]">No completed campaigns pending verification at this time.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {campaigns.map((campaign) => (
                            <motion.div
                                key={campaign.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--gray-200)] flex flex-col md:flex-row gap-6"
                            >
                                {/* Campaign Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${(campaign as any).status === 'funds_released' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {(campaign as any).status === 'funds_released' ? 'Funds Released' : 'Action Required'}
                                        </span>
                                        <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">{campaign.category}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--gray-900)] mb-1">{campaign.title}</h3>
                                    <p className="text-sm text-[var(--text-secondary)] mb-4">Raised: ₹{campaign.raised_amount.toLocaleString()} / ₹{campaign.target_amount.toLocaleString()}</p>

                                    {/* Progress Bar */}
                                    <div className="h-2 bg-gray-100 rounded-full w-full max-w-sm overflow-hidden mb-2">
                                        <div
                                            className="h-full bg-green-500"
                                            style={{ width: `${Math.min(100, (campaign.raised_amount / campaign.target_amount) * 100)}%` }}
                                        />
                                    </div>
                                    <Link href={`/campaigns/${campaign.id}`} className="text-sm text-[var(--primary)] hover:underline font-medium">
                                        View Full Campaign Details &rarr;
                                    </Link>
                                </div>

                                {/* Action Panel */}
                                <div className="w-full md:w-72 bg-[var(--gray-50)] rounded-xl p-5 border border-[var(--gray-200)] flex flex-col justify-center">
                                    {(campaign as any).status === 'funds_released' ? (
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 text-xl">✓</div>
                                            <h4 className="font-bold text-green-700">Funds Released</h4>
                                            <p className="text-xs text-[var(--text-secondary)] mt-1 break-all">
                                                TX: {(campaign as any).fundsReleasedTxHash?.substring(0, 16)}...
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="text-sm font-medium text-[var(--gray-700)] mb-3 text-center">
                                                Verification Actions
                                            </div>
                                            <button
                                                onClick={() => handleReleaseFunds(campaign)}
                                                disabled={processingId === campaign.id}
                                                className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-bold hover:bg-[var(--primary-hover)] transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                                            >
                                                {processingId === campaign.id ? (
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : '🛡️ Verify & Release'}
                                            </button>
                                            <p className="text-[10px] text-center text-[var(--text-secondary)] mt-3 leading-tight">
                                                By clicking, you certify that patient admission and bills have been verified.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
