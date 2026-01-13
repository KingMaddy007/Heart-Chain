'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';

export default function HospitalLoginPage() {
    const router = useRouter();
    const [adminId, setAdminId] = useState('');
    const [hospitalId, setHospitalId] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const isValid = await api.verifyHospitalLogin(adminId, hospitalId);
            if (isValid) {
                // Save session
                sessionStorage.setItem('hospital_session', JSON.stringify({ adminId, hospitalId }));
                router.push('/hospital/dashboard');
            } else {
                setError('Invalid credentials. Please verify your IDs.');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-[var(--gray-200)]"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                        🏥
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--gray-900)]">Hospital Admin Portal</h1>
                    <p className="text-[var(--text-secondary)]">Verify campaigns and process fund releases.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">Hospital Unique ID</label>
                        <input
                            type="text"
                            value={hospitalId}
                            onChange={(e) => setHospitalId(e.target.value)}
                            placeholder="e.g. HOSP_APOLLO_MUM"
                            className="w-full px-4 py-3 rounded-xl border border-[var(--gray-300)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">Admin ID</label>
                        <input
                            type="text"
                            value={adminId}
                            onChange={(e) => setAdminId(e.target.value)}
                            placeholder="e.g. ADMIN_RAJESH"
                            className="w-full px-4 py-3 rounded-xl border border-[var(--gray-300)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-bold hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            'Secure Login'
                        )}
                    </button>

                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-400">
                            For demo: Use <b>HOSP_APOLLO_MUM</b> / <b>ADMIN_RAJESH</b>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
