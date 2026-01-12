'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CampaignCard from '@/components/CampaignCard';
import HeartProgressBar from '@/components/HeartProgressBar';
import { mockCampaigns, platformStats, recentDonations, getFeaturedCampaigns } from '@/data/mockData';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { useState, useEffect } from 'react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Live Donation Ticker Component
function DonationTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recentDonations.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const donation = recentDonations[currentIndex];

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-soft p-4 border border-[var(--card-border)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          key={currentIndex}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-10 h-10 bg-[var(--success)] rounded-full flex items-center justify-center"
        >
          <span className="text-white text-lg">💝</span>
        </motion.div>
        <motion.div
          key={`text-${currentIndex}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-sm">
            <span className="font-bold text-[var(--text-primary)]">{donation.name}</span>
            <span className="text-[var(--text-secondary)]"> donated </span>
            <span className="font-bold text-[var(--accent)]">${donation.amount}</span>
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            to {donation.campaign} • {donation.time}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Stats Card Component
function StatCard({ value, label, icon }: { value: string; label: string; icon: string }) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-soft border border-[var(--card-border)] text-center"
      whileHover={{ y: -5 }}
      variants={fadeInUp}
    >
      <span className="text-4xl mb-3 block">{icon}</span>
      <motion.p
        className="text-3xl md:text-4xl font-bold text-[var(--accent)] mb-2"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {value}
      </motion.p>
      <p className="text-[var(--text-secondary)] font-medium">{label}</p>
    </motion.div>
  );
}

// How It Works Step Component
function HowItWorksStep({ step, title, description, icon }: { step: number; title: string; description: string; icon: string }) {
  return (
    <motion.div
      className="relative text-center"
      variants={fadeInUp}
    >
      {/* Step Number */}
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
        {step}
      </div>

      {/* Icon */}
      <div className="text-4xl mb-3">{icon}</div>

      {/* Content */}
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{title}</h3>
      <p className="text-[var(--text-secondary)] max-w-xs mx-auto">{description}</p>
    </motion.div>
  );
}

export default function HomePage() {
  const featuredCampaigns = getFeaturedCampaigns();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--beige-200)] to-[var(--beige-100)] py-20 md:py-32">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-[var(--success)]/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-soft mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[var(--text-secondary)]">
                  Powered by Blockchain Technology
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
                Every Cent Counts.{' '}
                <span className="text-[var(--accent)]">Every Heart Matters.</span>
              </h1>

              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-lg">
                Join our transparent, blockchain-verified charity platform. Every donation is tracked, every impact is measurable, every heart is touched.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/campaigns"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                >
                  Browse Campaigns
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/create"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--accent)] text-[var(--accent)] font-bold rounded-xl hover:bg-[var(--accent)] hover:text-white transition-all"
                >
                  Start a Campaign
                </Link>
              </div>

              {/* Live Ticker */}
              <div className="mt-10">
                <p className="text-sm text-[var(--text-secondary)] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
                  Live Donations
                </p>
                <DonationTicker />
              </div>
            </motion.div>

            {/* Right Content - Hero Heart Illustration */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative">
                {/* Main Heart */}
                <motion.div
                  className="animate-float"
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <HeartProgressBar percentage={78} size="lg" animated={true} />
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-8 -right-8 w-16 h-16 bg-[var(--success)]/20 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-2xl">🌟</span>
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-8 w-12 h-12 bg-[var(--accent)]/20 rounded-full flex items-center justify-center"
                  animate={{ scale: [1.1, 1, 1.1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <span className="text-xl">💫</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[var(--beige-100)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <StatCard
              value={formatCurrency(platformStats.totalRaised)}
              label="Total Raised"
              icon="💰"
            />
            <StatCard
              value={formatNumber(platformStats.livesImpacted)}
              label="Lives Impacted"
              icon="❤️"
            />
            <StatCard
              value={formatNumber(platformStats.activeCampaigns)}
              label="Active Campaigns"
              icon="📢"
            />
            <StatCard
              value={formatNumber(platformStats.totalDonors)}
              label="Generous Donors"
              icon="👥"
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              How HeartChain Works
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Simple, transparent, and secure. Three steps to make a difference.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-12 relative"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Connector Lines (Desktop) */}
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[var(--accent)] via-[var(--beige-400)] to-[var(--accent)]" />

            <HowItWorksStep
              step={1}
              title="Donate"
              description="Choose a cause close to your heart and donate using cryptocurrency or traditional payment methods."
              icon="💝"
            />
            <HowItWorksStep
              step={2}
              title="Track"
              description="Follow your donation's journey in real-time. Every transaction is recorded on the blockchain."
              icon="📊"
            />
            <HowItWorksStep
              step={3}
              title="Verify"
              description="See exactly how your funds are used with transparent impact reports and on-chain verification."
              icon="✅"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Campaigns Section */}
      <section className="py-20 bg-[var(--beige-100)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
                Featured Campaigns
              </h2>
              <p className="text-[var(--text-secondary)]">
                Urgent causes that need your support right now
              </p>
            </div>
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:gap-4 transition-all"
            >
              View All Campaigns
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCampaigns.map((campaign, index) => (
              <CampaignCard key={campaign.id} campaign={campaign} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="hearts" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 6c-1.5-2-4.5-2-6 0s-1.5 5.5 6 9c7.5-3.5 7.5-7 6-9s-4.5-2-6 0z" fill="currentColor" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#hearts)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you want to support a cause or start your own campaign, HeartChain makes giving transparent and impactful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/campaigns"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[var(--accent)] font-bold rounded-xl hover:bg-[var(--beige-100)] transition-colors shadow-lg"
              >
                💖 Donate Now
              </Link>
              <Link
                href="/create"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
              >
                🚀 Start a Campaign
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <svg className="w-6 h-6 text-[var(--success)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">100% Transparent</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <svg className="w-6 h-6 text-[var(--success)]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Verified Campaigns</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <svg className="w-6 h-6 text-[var(--success)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Impactful Giving</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <svg className="w-6 h-6 text-[var(--success)]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              <span className="font-medium">Blockchain Secured</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
