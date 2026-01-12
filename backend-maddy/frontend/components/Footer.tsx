import Link from 'next/link';

const footerLinks = {
    platform: [
        { label: 'Browse Campaigns', href: '/campaigns' },
        { label: 'Start a Campaign', href: '/create' },
        { label: 'Leaderboards', href: '/leaderboards' },
        { label: 'How It Works', href: '/#how-it-works' },
    ],
    resources: [
        { label: 'Help Center', href: '#' },
        { label: 'Trust & Safety', href: '#' },
        { label: 'FAQs', href: '#' },
        { label: 'Blog', href: '#' },
    ],
    legal: [
        { label: 'Terms of Service', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Cookie Policy', href: '#' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-[var(--beige-200)] border-t border-[var(--beige-300)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <svg viewBox="0 0 32 29.6" className="w-8 h-8 text-[var(--accent)]">
                                <path
                                    fill="currentColor"
                                    d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                                />
                            </svg>
                            <span className="text-xl font-bold text-[var(--text-primary)]">
                                Heart<span className="text-[var(--accent)]">Chain</span>
                            </span>
                        </Link>
                        <p className="text-[var(--text-secondary)] mb-6 max-w-sm">
                            Every cent counts. Every heart matters. Join our blockchain-powered charity platform and make a transparent, verified impact.
                        </p>

                        {/* Blockchain Transparency Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-soft">
                            <svg className="w-5 h-5 text-[var(--success)]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium text-[var(--text-primary)]">
                                100% Blockchain Verified
                            </span>
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="font-bold text-[var(--text-primary)] mb-4">Platform</h4>
                        <ul className="space-y-3">
                            {footerLinks.platform.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="font-bold text-[var(--text-primary)] mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-[var(--text-primary)] mb-4">Stay Updated</h4>
                        <p className="text-sm text-[var(--text-secondary)] mb-4">
                            Get the latest campaigns and impact stories.
                        </p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2.5 bg-white border border-[var(--beige-300)] rounded-xl focus:border-[var(--accent)] focus:outline-none text-sm"
                            />
                            <button
                                type="submit"
                                className="w-full py-2.5 bg-[var(--accent)] text-white font-medium rounded-xl hover:bg-[var(--accent-hover)] transition-colors text-sm"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[var(--beige-300)] pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-[var(--text-secondary)]">
                            © 2024 HeartChain. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-[var(--accent)] hover:text-white transition-all shadow-soft"
                                aria-label="Twitter"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-[var(--accent)] hover:text-white transition-all shadow-soft"
                                aria-label="Discord"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-[var(--accent)] hover:text-white transition-all shadow-soft"
                                aria-label="GitHub"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-[var(--accent)] hover:text-white transition-all shadow-soft"
                                aria-label="Telegram"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                            </a>
                        </div>

                        {/* Legal Links */}
                        <div className="flex items-center gap-6">
                            {footerLinks.legal.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
