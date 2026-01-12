'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/campaigns', label: 'Campaigns' },
    { href: '/leaderboards', label: 'Leaderboards' },
    { href: '/profile', label: 'Profile' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <motion.div
                                className="w-10 h-10 flex items-center justify-center"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg viewBox="0 0 32 29.6" className="w-8 h-8 text-[var(--accent)]">
                                    <path
                                        fill="currentColor"
                                        d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                                    />
                                </svg>
                            </motion.div>
                            <span className="text-xl font-bold text-[var(--text-primary)]">
                                Heart<span className="text-[var(--accent)]">Chain</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative font-medium transition-colors ${pathname === link.href
                                            ? 'text-[var(--accent)]'
                                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                        }`}
                                >
                                    {link.label}
                                    {pathname === link.href && (
                                        <motion.div
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--accent)] rounded-full"
                                            layoutId="navbar-indicator"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            <Link
                                href="/create"
                                className="px-4 py-2 text-[var(--accent)] font-medium hover:bg-[var(--beige-200)] rounded-lg transition-colors"
                            >
                                Start Campaign
                            </Link>
                            <button className="px-5 py-2.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                Connect Wallet
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 hover:bg-[var(--beige-200)] rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/30 z-40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            className="fixed top-16 left-0 right-0 bg-white z-40 md:hidden shadow-lg"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div className="p-4 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block py-3 px-4 rounded-xl font-medium transition-colors ${pathname === link.href
                                                ? 'bg-[var(--beige-200)] text-[var(--accent)]'
                                                : 'text-[var(--text-secondary)] hover:bg-[var(--beige-100)]'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <hr className="my-4 border-[var(--beige-200)]" />
                                <Link
                                    href="/create"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-3 px-4 text-center border-2 border-[var(--accent)] text-[var(--accent)] font-medium rounded-xl hover:bg-[var(--beige-100)] transition-colors"
                                >
                                    Start Campaign
                                </Link>
                                <button className="w-full py-3 px-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    Connect Wallet
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Spacer for fixed navbar */}
            <div className="h-16 md:h-20" />
        </>
    );
}
