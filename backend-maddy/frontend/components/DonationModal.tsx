'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import HeartProgressBar from './HeartProgressBar';
import { formatCurrency, generateTxHash } from '@/lib/utils';

interface DonationModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignTitle: string;
    currentAmount: number;
    goalAmount: number;
}

const presetAmounts = [5, 25, 50, 100];

export default function DonationModal({
    isOpen,
    onClose,
    campaignTitle,
    currentAmount,
    goalAmount,
}: DonationModalProps) {
    const [amount, setAmount] = useState<number | string>(25);
    const [step, setStep] = useState<'select' | 'confirm' | 'success'>('select');
    const [isProcessing, setIsProcessing] = useState(false);
    const [txHash, setTxHash] = useState('');

    const handleDonate = async () => {
        setIsProcessing(true);
        // Simulate blockchain transaction
        await new Promise(resolve => setTimeout(resolve, 2000));
        setTxHash(generateTxHash());
        setIsProcessing(false);
        setStep('success');
    };

    const handleClose = () => {
        setStep('select');
        setAmount(25);
        setTxHash('');
        onClose();
    };

    const numericAmount = typeof amount === 'string' ? parseFloat(amount) || 0 : amount;
    const newPercentage = Math.min(((currentAmount + numericAmount) / goalAmount) * 100, 100);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-white rounded-2xl z-50 max-w-md w-full mx-auto overflow-hidden shadow-2xl"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        {step === 'select' && (
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-[var(--text-primary)]">Make a Donation</h2>
                                    <button
                                        onClick={handleClose}
                                        className="p-2 hover:bg-[var(--beige-200)] rounded-full transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Campaign Info */}
                                <p className="text-sm text-[var(--text-secondary)] mb-6">
                                    Supporting: <span className="font-medium text-[var(--text-primary)]">{campaignTitle}</span>
                                </p>

                                {/* Preset Amounts */}
                                <div className="grid grid-cols-4 gap-3 mb-4">
                                    {presetAmounts.map((preset) => (
                                        <button
                                            key={preset}
                                            onClick={() => setAmount(preset)}
                                            className={`py-3 rounded-xl font-medium transition-all ${amount === preset
                                                    ? 'bg-[var(--accent)] text-white'
                                                    : 'bg-[var(--beige-200)] text-[var(--text-primary)] hover:bg-[var(--beige-300)]'
                                                }`}
                                        >
                                            ${preset}
                                        </button>
                                    ))}
                                </div>

                                {/* Custom Amount */}
                                <div className="relative mb-6">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] font-medium">$</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Custom amount"
                                        className="w-full pl-8 pr-4 py-3 border-2 border-[var(--beige-300)] rounded-xl focus:border-[var(--accent)] focus:outline-none transition-colors text-lg font-medium text-[var(--text-primary)]"
                                    />
                                </div>

                                {/* Impact Preview */}
                                <div className="bg-[var(--beige-100)] rounded-xl p-4 mb-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-[var(--text-secondary)]">Your impact</p>
                                            <p className="text-lg font-bold text-[var(--accent)]">
                                                {formatCurrency(currentAmount)} → {formatCurrency(currentAmount + numericAmount)}
                                            </p>
                                        </div>
                                        <HeartProgressBar percentage={newPercentage} size="sm" animated={false} />
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={() => setStep('confirm')}
                                    disabled={numericAmount <= 0}
                                    className="w-full py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue with {formatCurrency(numericAmount)}
                                </button>
                            </div>
                        )}

                        {step === 'confirm' && (
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <button
                                        onClick={() => setStep('select')}
                                        className="p-2 hover:bg-[var(--beige-200)] rounded-full transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <h2 className="text-xl font-bold text-[var(--text-primary)]">Confirm Donation</h2>
                                    <div className="w-9" />
                                </div>

                                {/* Transaction Preview */}
                                <div className="bg-[var(--beige-100)] rounded-xl p-6 mb-6">
                                    <div className="text-center mb-4">
                                        <p className="text-sm text-[var(--text-secondary)] mb-2">You are donating</p>
                                        <p className="text-4xl font-bold text-[var(--accent)]">{formatCurrency(numericAmount)}</p>
                                    </div>
                                    <div className="border-t border-[var(--beige-300)] pt-4">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-[var(--text-secondary)]">To:</span>
                                            <span className="font-medium text-[var(--text-primary)]">{campaignTitle}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[var(--text-secondary)]">Network Fee:</span>
                                            <span className="font-medium text-[var(--success)]">$0.00 (Sponsored)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Wallet Connect Placeholder */}
                                <div className="border-2 border-dashed border-[var(--beige-300)] rounded-xl p-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[var(--beige-200)] rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--text-primary)]">Wallet Connected</p>
                                            <p className="text-sm text-[var(--text-secondary)]">0x1234...5678 (Demo)</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Confirm Button */}
                                <button
                                    onClick={handleDonate}
                                    disabled={isProcessing}
                                    className="w-full py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <motion.div
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            💝 Confirm Donation
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        {step === 'success' && (
                            <div className="p-6 text-center">
                                {/* Confetti Animation */}
                                <div className="relative mb-6">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                                    >
                                        <div className="w-24 h-24 mx-auto bg-[var(--success)] rounded-full flex items-center justify-center">
                                            <motion.svg
                                                className="w-12 h-12 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </motion.svg>
                                        </div>
                                    </motion.div>

                                    {/* Confetti Particles */}
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-3 h-3 rounded-full"
                                            style={{
                                                backgroundColor: ['#8B4513', '#CD5C5C', '#6B8E23', '#FFD700'][i % 4],
                                                left: '50%',
                                                top: '50%',
                                            }}
                                            initial={{ x: 0, y: 0, scale: 0 }}
                                            animate={{
                                                x: Math.cos((i * 30) * Math.PI / 180) * 80,
                                                y: Math.sin((i * 30) * Math.PI / 180) * 80,
                                                scale: [0, 1, 0],
                                            }}
                                            transition={{ duration: 1, delay: 0.3 }}
                                        />
                                    ))}
                                </div>

                                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Thank You! 💖</h2>
                                <p className="text-[var(--text-secondary)] mb-6">
                                    Your donation of {formatCurrency(numericAmount)} has been received!
                                </p>

                                {/* Transaction Hash */}
                                <div className="bg-[var(--beige-100)] rounded-xl p-4 mb-6">
                                    <p className="text-sm text-[var(--text-secondary)] mb-1">Transaction ID</p>
                                    <p className="text-xs font-mono text-[var(--text-primary)] break-all">{txHash}</p>
                                </div>

                                {/* Share Buttons */}
                                <div className="flex gap-3 mb-6">
                                    <button className="flex-1 py-3 bg-[#1DA1F2] text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
                                        Share on X
                                    </button>
                                    <button className="flex-1 py-3 bg-[#0A66C2] text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
                                        LinkedIn
                                    </button>
                                </div>

                                <button
                                    onClick={handleClose}
                                    className="w-full py-3 border-2 border-[var(--beige-300)] text-[var(--text-primary)] font-medium rounded-xl hover:bg-[var(--beige-100)] transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
