import { clsx, type ClassValue } from 'clsx';

// Simple class merge utility (avoiding twMerge dependency)
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

// Format currency
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

// Format large numbers
export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Calculate percentage
export function calculatePercentage(raised: number, goal: number): number {
    return Math.min(Math.round((raised / goal) * 100), 100);
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

// Truncate wallet/transaction hash
export function truncateHash(hash: string, chars: number = 6): string {
    if (hash.length <= chars * 2) return hash;
    return `${hash.slice(0, chars)}...${hash.slice(-chars)}`;
}

// Format date
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

// Days remaining text
export function getDaysRemainingText(days: number): string {
    if (days === 0) return 'Last day!';
    if (days === 1) return '1 day left';
    if (days < 7) return `${days} days left`;
    if (days < 30) return `${Math.floor(days / 7)} weeks left`;
    return `${Math.floor(days / 30)} months left`;
}

// Generate random confetti colors
export function getConfettiColors(): string[] {
    return ['#8B4513', '#CD5C5C', '#6B8E23', '#F5F5DC', '#E8DCC4', '#FFD700'];
}

// Simulate blockchain transaction hash
export function generateTxHash(): string {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
}

// Category to emoji mapping
export const categoryEmojis: Record<string, string> = {
    medical: '🏥',
    education: '📚',
    disaster: '🆘',
    community: '🏘️',
    environment: '🌍',
    emergency: '🚨',
};

// Rarity colors for badges
export const rarityColors: Record<string, { bg: string; text: string; border: string }> = {
    common: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
    rare: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300' },
    epic: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-300' },
    legendary: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300' },
};
