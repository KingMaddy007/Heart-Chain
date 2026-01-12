// Mock Data for HeartChain Platform

export interface Campaign {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    category: 'medical' | 'education' | 'disaster' | 'community' | 'environment' | 'emergency';
    image: string;
    goal: number;
    raised: number;
    daysLeft: number;
    contributors: number;
    creatorName: string;
    creatorAvatar: string;
    isVerified: boolean;
    isHighPriority: boolean;
    createdAt: string;
    updates: CampaignUpdate[];
    impactBreakdown: ImpactItem[];
    recentDonors: Donor[];
}

export interface CampaignUpdate {
    id: string;
    date: string;
    title: string;
    content: string;
}

export interface ImpactItem {
    label: string;
    percentage: number;
    amount: number;
}

export interface Donor {
    id: string;
    name: string;
    amount: number;
    date: string;
    transactionHash: string;
    avatar?: string;
}

export interface User {
    id: string;
    name: string;
    avatar: string;
    totalDonated: number;
    impactScore: number;
    rank: number;
    campaignsSupported: number;
    badges: Badge[];
    donationHistory: DonationHistoryItem[];
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    earnedAt?: string;
    isEarned: boolean;
}

export interface DonationHistoryItem {
    id: string;
    campaignId: string;
    campaignName: string;
    amount: number;
    date: string;
    transactionHash: string;
    status: 'completed' | 'pending';
}

export interface LeaderboardEntry {
    rank: number;
    userId: string;
    name: string;
    avatar: string;
    totalDonated: number;
    campaignsSupported: number;
    badges: string[];
}

// Category Labels
export const categoryLabels: Record<Campaign['category'], string> = {
    medical: 'Medical',
    education: 'Education',
    disaster: 'Disaster Relief',
    community: 'Community',
    environment: 'Environment',
    emergency: 'Emergency',
};

export const categoryColors: Record<Campaign['category'], string> = {
    medical: '#E57373',
    education: '#64B5F6',
    disaster: '#FFB74D',
    community: '#81C784',
    environment: '#4DB6AC',
    emergency: '#F06292',
};

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
    {
        id: '1',
        title: "Sarah's Heart Surgery Fund",
        description: "Help 6-year-old Sarah get the life-saving heart surgery she needs.",
        fullDescription: `Sarah is a bright, energetic 6-year-old girl who was born with a congenital heart defect. After years of managing her condition, doctors have determined that she needs open-heart surgery to repair her mitral valve.
    
    The surgery and recovery will cost approximately $75,000, and while insurance covers some of it, the family still needs to raise $50,000 to cover the remaining costs.
    
    Sarah loves painting, playing with her dog Max, and dreams of becoming a veterinarian one day. With your help, we can give Sarah the chance to grow up and achieve her dreams.
    
    Every donation, no matter how small, brings Sarah one step closer to a healthy future. Thank you for your generosity and compassion.`,
        category: 'medical',
        image: '/campaigns/sarah-heart.jpg',
        goal: 50000,
        raised: 42500,
        daysLeft: 12,
        contributors: 847,
        creatorName: 'Emily Thompson',
        creatorAvatar: '/avatars/emily.jpg',
        isVerified: true,
        isHighPriority: true,
        createdAt: '2024-01-15',
        updates: [
            { id: '1', date: '2024-02-10', title: 'Surgery Date Confirmed!', content: 'Great news! We have confirmed Sarah\'s surgery date for March 15th. Thank you all for your incredible support!' },
            { id: '2', date: '2024-02-01', title: 'Halfway There!', content: 'We\'ve reached 50% of our goal! Sarah and our family are so grateful for everyone\'s generosity.' },
        ],
        impactBreakdown: [
            { label: 'Surgery Cost', percentage: 60, amount: 30000 },
            { label: 'Hospital Stay', percentage: 25, amount: 12500 },
            { label: 'Recovery & Therapy', percentage: 15, amount: 7500 },
        ],
        recentDonors: [
            { id: '1', name: 'Anonymous', amount: 500, date: '2024-02-12', transactionHash: '0x1a2b3c4d5e6f...' },
            { id: '2', name: 'John D.', amount: 100, date: '2024-02-12', transactionHash: '0x2b3c4d5e6f7g...' },
            { id: '3', name: 'Maria S.', amount: 250, date: '2024-02-11', transactionHash: '0x3c4d5e6f7g8h...' },
        ],
    },
    {
        id: '2',
        title: 'Rural School Library Project',
        description: 'Build a library for 500+ students in a rural community who have no access to books.',
        fullDescription: `In the small village of Millbrook, over 500 students attend the local elementary and middle school, but there is no library. Students have to travel 30 miles to the nearest public library, which most families cannot afford to do regularly.

    We are raising funds to build and stock a library that will serve not just the school but the entire community. The library will include:
    - 5,000 books across all age levels
    - Computer stations with internet access
    - A dedicated reading room
    - After-school tutoring space

    Your donation will help open doors to knowledge and opportunity for these children who deserve every chance to succeed.`,
        category: 'education',
        image: '/campaigns/rural-library.jpg',
        goal: 35000,
        raised: 18200,
        daysLeft: 28,
        contributors: 312,
        creatorName: 'Teachers United Foundation',
        creatorAvatar: '/avatars/tuf.jpg',
        isVerified: true,
        isHighPriority: false,
        createdAt: '2024-01-20',
        updates: [
            { id: '1', date: '2024-02-08', title: 'Land Approved!', content: 'The school district has approved the land for our library building!' },
        ],
        impactBreakdown: [
            { label: 'Construction', percentage: 50, amount: 17500 },
            { label: 'Books & Materials', percentage: 30, amount: 10500 },
            { label: 'Technology', percentage: 20, amount: 7000 },
        ],
        recentDonors: [
            { id: '1', name: 'BookLovers Club', amount: 1000, date: '2024-02-10', transactionHash: '0x4d5e6f7g8h9i...' },
            { id: '2', name: 'Robert K.', amount: 50, date: '2024-02-10', transactionHash: '0x5e6f7g8h9i0j...' },
        ],
    },
    {
        id: '3',
        title: 'Earthquake Relief Fund - Turkey',
        description: 'Emergency aid for families affected by the devastating earthquake in southeastern Turkey.',
        fullDescription: `The devastating earthquake that struck southeastern Turkey has left thousands homeless and in desperate need of assistance. Entire communities have been destroyed, and families are struggling to survive without shelter, food, or clean water.

    Our team is on the ground providing:
    - Emergency shelter and blankets
    - Food and clean water
    - Medical supplies and first aid
    - Psychological support for trauma survivors

    The need is urgent and every dollar counts. 100% of donations go directly to relief efforts.`,
        category: 'disaster',
        image: '/campaigns/turkey-earthquake.jpg',
        goal: 100000,
        raised: 87500,
        daysLeft: 5,
        contributors: 2341,
        creatorName: 'Global Relief Network',
        creatorAvatar: '/avatars/grn.jpg',
        isVerified: true,
        isHighPriority: true,
        createdAt: '2024-02-01',
        updates: [
            { id: '1', date: '2024-02-11', title: 'Urgent Update', content: 'We have distributed supplies to 500 families this week. More help is desperately needed.' },
            { id: '2', date: '2024-02-05', title: 'First Shipment Arrived', content: 'Our first shipment of supplies has arrived and distribution has begun.' },
        ],
        impactBreakdown: [
            { label: 'Emergency Shelter', percentage: 40, amount: 40000 },
            { label: 'Food & Water', percentage: 35, amount: 35000 },
            { label: 'Medical Aid', percentage: 25, amount: 25000 },
        ],
        recentDonors: [
            { id: '1', name: 'Corporate Donor', amount: 5000, date: '2024-02-12', transactionHash: '0x6f7g8h9i0j1k...' },
            { id: '2', name: 'Anonymous', amount: 200, date: '2024-02-12', transactionHash: '0x7g8h9i0j1k2l...' },
        ],
    },
    {
        id: '4',
        title: 'Community Garden Initiative',
        description: 'Transform an abandoned lot into a thriving community garden for 200+ families.',
        fullDescription: `Our neighborhood has an abandoned lot that has become an eyesore and a safety hazard. We want to transform it into a beautiful community garden that will:

    - Provide fresh vegetables for 200+ families in our food desert neighborhood
    - Create a safe, green space for children to play and learn about nature
    - Offer gardening education programs
    - Build community connections through shared growing spaces

    Join us in turning blight into bloom!`,
        category: 'community',
        image: '/campaigns/community-garden.jpg',
        goal: 15000,
        raised: 9800,
        daysLeft: 45,
        contributors: 156,
        creatorName: 'Green Streets Collective',
        creatorAvatar: '/avatars/gsc.jpg',
        isVerified: true,
        isHighPriority: false,
        createdAt: '2024-01-10',
        updates: [
            { id: '1', date: '2024-02-01', title: 'Soil Testing Complete', content: 'The soil has been tested and cleared for organic gardening!' },
        ],
        impactBreakdown: [
            { label: 'Lot Cleanup & Prep', percentage: 25, amount: 3750 },
            { label: 'Soil & Plants', percentage: 40, amount: 6000 },
            { label: 'Equipment & Tools', percentage: 35, amount: 5250 },
        ],
        recentDonors: [
            { id: '1', name: 'Green Thumb Inc.', amount: 500, date: '2024-02-09', transactionHash: '0x8h9i0j1k2l3m...' },
        ],
    },
    {
        id: '5',
        title: 'Ocean Cleanup Project',
        description: 'Deploy cleanup technology to remove plastic from a 10-mile stretch of coastline.',
        fullDescription: `Our beautiful coastline is being choked by plastic pollution. Every day, marine life suffers and our ecosystem degrades further. 

    Our project will:
    - Deploy specialized cleanup boats and equipment
    - Remove an estimated 50,000 pounds of plastic debris
    - Engage 500+ volunteers in beach cleanup days
    - Install permanent filtration systems at key runoff points
    - Educate local schools about ocean conservation

    Help us restore our ocean to its natural beauty.`,
        category: 'environment',
        image: '/campaigns/ocean-cleanup.jpg',
        goal: 45000,
        raised: 31500,
        daysLeft: 60,
        contributors: 623,
        creatorName: 'Blue Ocean Alliance',
        creatorAvatar: '/avatars/boa.jpg',
        isVerified: true,
        isHighPriority: false,
        createdAt: '2024-01-05',
        updates: [
            { id: '1', date: '2024-02-07', title: 'First Cleanup Complete!', content: 'We removed 5,000 pounds of plastic in our first cleanup event!' },
        ],
        impactBreakdown: [
            { label: 'Equipment', percentage: 45, amount: 20250 },
            { label: 'Operations', percentage: 35, amount: 15750 },
            { label: 'Education Program', percentage: 20, amount: 9000 },
        ],
        recentDonors: [
            { id: '1', name: 'Ocean Lovers', amount: 300, date: '2024-02-11', transactionHash: '0x9i0j1k2l3m4n...' },
        ],
    },
    {
        id: '6',
        title: "Veteran's Housing Support",
        description: 'Provide transitional housing for 20 homeless veterans in our city.',
        fullDescription: `Too many of our veterans who served our country are now living on the streets. This campaign will provide transitional housing for 20 homeless veterans, giving them a safe place to stay while they get back on their feet.

    Our program includes:
    - Safe, furnished apartments for up to 6 months
    - Job training and placement assistance
    - Mental health counseling and PTSD support
    - Financial literacy education
    - Community building activities

    These heroes deserve our support. Help us honor their service.`,
        category: 'community',
        image: '/campaigns/veteran-housing.jpg',
        goal: 80000,
        raised: 52000,
        daysLeft: 30,
        contributors: 891,
        creatorName: 'Veterans First Foundation',
        creatorAvatar: '/avatars/vff.jpg',
        isVerified: true,
        isHighPriority: false,
        createdAt: '2024-01-12',
        updates: [
            { id: '1', date: '2024-02-05', title: '10 Veterans Housed!', content: 'We have successfully housed 10 veterans so far. Thank you for making this possible!' },
        ],
        impactBreakdown: [
            { label: 'Housing Costs', percentage: 60, amount: 48000 },
            { label: 'Support Services', percentage: 30, amount: 24000 },
            { label: 'Administration', percentage: 10, amount: 8000 },
        ],
        recentDonors: [
            { id: '1', name: 'Patriots United', amount: 1000, date: '2024-02-10', transactionHash: '0x0j1k2l3m4n5o...' },
        ],
    },
    {
        id: '7',
        title: 'Emergency Fire Relief - California',
        description: 'Immediate assistance for families who lost everything in the wildfire.',
        fullDescription: `The recent wildfire has devastated our community. Over 100 families have lost their homes and all their possessions. They need immediate help with:

    - Temporary housing
    - Clothing and basic necessities
    - Food and water
    - Medical care for burns and smoke inhalation
    - Pet care and emergency veterinary services

    These families have lost everything. Please help us help them start over.`,
        category: 'emergency',
        image: '/campaigns/fire-relief.jpg',
        goal: 150000,
        raised: 128000,
        daysLeft: 8,
        contributors: 3245,
        creatorName: 'California Relief Fund',
        creatorAvatar: '/avatars/crf.jpg',
        isVerified: true,
        isHighPriority: true,
        createdAt: '2024-02-05',
        updates: [
            { id: '1', date: '2024-02-12', title: 'Hotel Vouchers Distributed', content: 'We have provided hotel vouchers to all displaced families.' },
        ],
        impactBreakdown: [
            { label: 'Temporary Housing', percentage: 50, amount: 75000 },
            { label: 'Basic Necessities', percentage: 30, amount: 45000 },
            { label: 'Medical Care', percentage: 20, amount: 30000 },
        ],
        recentDonors: [
            { id: '1', name: 'Tech Company', amount: 10000, date: '2024-02-12', transactionHash: '0x1k2l3m4n5o6p...' },
        ],
    },
    {
        id: '8',
        title: 'Scholarship Fund for First-Gen Students',
        description: 'Help 10 first-generation college students achieve their dreams.',
        fullDescription: `First-generation college students face unique challenges. They often lack the financial resources, guidance, and support network that others take for granted.

    Our scholarship fund will provide:
    - $5,000 scholarship per student
    - Mentorship matching with successful professionals
    - Laptop and school supplies
    - Access to tutoring and academic support
    - Career development workshops

    Help us open doors that have been closed for too long.`,
        category: 'education',
        image: '/campaigns/scholarship.jpg',
        goal: 60000,
        raised: 24000,
        daysLeft: 90,
        contributors: 432,
        creatorName: 'Education Forward',
        creatorAvatar: '/avatars/ef.jpg',
        isVerified: true,
        isHighPriority: false,
        createdAt: '2024-01-01',
        updates: [
            { id: '1', date: '2024-02-01', title: 'Applications Open!', content: 'We are now accepting applications for the scholarship program.' },
        ],
        impactBreakdown: [
            { label: 'Scholarships', percentage: 80, amount: 48000 },
            { label: 'Supplies & Equipment', percentage: 15, amount: 9000 },
            { label: 'Program Operations', percentage: 5, amount: 3000 },
        ],
        recentDonors: [
            { id: '1', name: 'Education Fund', amount: 2500, date: '2024-02-08', transactionHash: '0x2l3m4n5o6p7q...' },
        ],
    },
    {
        id: '9',
        title: "Children's Cancer Treatment Fund",
        description: 'Help families afford cancer treatment for their children at St. Grace Hospital.',
        fullDescription: `When a child is diagnosed with cancer, families face not only emotional devastation but also crushing financial burden. Treatment can cost hundreds of thousands of dollars, and many families cannot afford it.

    This fund will help families at St. Grace Children's Hospital pay for:
    - Chemotherapy and radiation treatments
    - Surgical procedures
    - Hospital stays
    - Transportation to and from treatment
    - Lost wages for caregiving parents

    No child should go without treatment because of money. Help us save lives.`,
        category: 'medical',
        image: '/campaigns/cancer-kids.jpg',
        goal: 200000,
        raised: 156000,
        daysLeft: 15,
        contributors: 4521,
        creatorName: 'St. Grace Hospital Foundation',
        creatorAvatar: '/avatars/sgh.jpg',
        isVerified: true,
        isHighPriority: true,
        createdAt: '2024-01-08',
        updates: [
            { id: '1', date: '2024-02-10', title: '15 Families Helped', content: 'We have provided assistance to 15 families this month alone.' },
        ],
        impactBreakdown: [
            { label: 'Treatment Costs', percentage: 70, amount: 140000 },
            { label: 'Family Support', percentage: 20, amount: 40000 },
            { label: 'Administration', percentage: 10, amount: 20000 },
        ],
        recentDonors: [
            { id: '1', name: 'Healthcare Heroes', amount: 5000, date: '2024-02-12', transactionHash: '0x3m4n5o6p7q8r...' },
        ],
    },
    {
        id: '10',
        title: 'Animal Shelter Expansion',
        description: 'Expand our no-kill shelter to save 500 more animals per year.',
        fullDescription: `Our no-kill animal shelter is at capacity as we are experiencing a unprecedented surrender volume. We need to expand our facility to save more lives.

    The expansion will include:
    - 50 new dog kennels
    - 100 new cat condos
    - Medical treatment area
    - Outdoor exercise yard
    - Volunteer training center

    Every animal deserves a second chance. Help us give them one.`,
        category: 'community',
        image: '/campaigns/animal-shelter.jpg',
        goal: 75000,
        raised: 48500,
        daysLeft: 40,
        contributors: 967,
        creatorName: 'Paws & Claws Rescue',
        creatorAvatar: '/avatars/pcr.jpg',
        isVerified: true,
        isHighPriority: false,
        createdAt: '2024-01-18',
        updates: [
            { id: '1', date: '2024-02-03', title: 'Construction Permits Approved', content: 'We have received all necessary permits to begin construction!' },
        ],
        impactBreakdown: [
            { label: 'Construction', percentage: 60, amount: 45000 },
            { label: 'Equipment', percentage: 25, amount: 18750 },
            { label: 'Medical Supplies', percentage: 15, amount: 11250 },
        ],
        recentDonors: [
            { id: '1', name: 'Pet Lovers Club', amount: 750, date: '2024-02-09', transactionHash: '0x4n5o6p7q8r9s...' },
        ],
    },
    {
        id: '11',
        title: 'Clean Water for Village Schools',
        description: 'Install water purification systems in 5 rural schools serving 2,000 children.',
        fullDescription: `In many rural villages, children are forced to drink contaminated water because their schools have no access to clean water. This leads to illness, missed school days, and in severe cases, death from waterborne diseases.

    Our project will install solar-powered water purification systems in 5 schools, providing:
    - Clean drinking water for 2,000+ children
    - Handwashing stations to improve hygiene
    - Education about water safety and hygiene
    - Maintenance training for local staff

    Clean water is a basic human right. Help us make it a reality for these children.`,
        category: 'education',
        image: '/campaigns/clean-water.jpg',
        goal: 25000,
        raised: 21500,
        daysLeft: 18,
        contributors: 534,
        creatorName: 'Water for All International',
        creatorAvatar: '/avatars/wfa.jpg',
        isVerified: true,
        isHighPriority: false,
        createdAt: '2024-01-22',
        updates: [
            { id: '1', date: '2024-02-06', title: 'First System Installed', content: 'We have installed the first purification system at Sunrise Elementary!' },
        ],
        impactBreakdown: [
            { label: 'Purification Systems', percentage: 70, amount: 17500 },
            { label: 'Installation', percentage: 20, amount: 5000 },
            { label: 'Training & Education', percentage: 10, amount: 2500 },
        ],
        recentDonors: [
            { id: '1', name: 'Clean Water Fund', amount: 1000, date: '2024-02-10', transactionHash: '0x5o6p7q8r9s0t...' },
        ],
    },
    {
        id: '12',
        title: 'Flood Recovery - Bangladesh',
        description: 'Rebuilding homes and lives after devastating monsoon floods.',
        fullDescription: `The monsoon floods in Bangladesh have displaced over 100,000 people. Entire villages have been washed away, and families are living in temporary shelters with no food, clean water, or medical care.

    Our relief efforts include:
    - Rebuilding 200 flood-resistant homes
    - Providing food and clean water
    - Medical care and disease prevention
    - Seeds and tools for farmers to replant
    - School supplies for children

    Help us rebuild hope for these communities.`,
        category: 'disaster',
        image: '/campaigns/flood-bangladesh.jpg',
        goal: 120000,
        raised: 67000,
        daysLeft: 25,
        contributors: 1876,
        creatorName: 'South Asia Relief',
        creatorAvatar: '/avatars/sar.jpg',
        isVerified: true,
        isHighPriority: true,
        createdAt: '2024-01-25',
        updates: [
            { id: '1', date: '2024-02-09', title: '50 Homes Rebuilt', content: 'Thanks to your support, we have rebuilt 50 homes already!' },
        ],
        impactBreakdown: [
            { label: 'Home Reconstruction', percentage: 50, amount: 60000 },
            { label: 'Emergency Supplies', percentage: 30, amount: 36000 },
            { label: 'Agricultural Support', percentage: 20, amount: 24000 },
        ],
        recentDonors: [
            { id: '1', name: 'World Aid', amount: 3000, date: '2024-02-11', transactionHash: '0x6p7q8r9s0t1u...' },
        ],
    },
];

// Mock Badges
export const mockBadges: Badge[] = [
    { id: '1', name: 'First Heart', description: 'Made your first donation', icon: '💝', rarity: 'common', isEarned: true, earnedAt: '2024-01-15' },
    { id: '2', name: 'Generous Soul', description: 'Donated over $100 total', icon: '💖', rarity: 'common', isEarned: true, earnedAt: '2024-01-20' },
    { id: '3', name: 'Guardian Angel', description: 'Supported 5+ campaigns', icon: '👼', rarity: 'rare', isEarned: true, earnedAt: '2024-02-01' },
    { id: '4', name: 'Heart of Gold', description: 'Donated over $500 total', icon: '💛', rarity: 'rare', isEarned: true, earnedAt: '2024-02-05' },
    { id: '5', name: 'Top 100 Donor', description: 'Ranked in Top 100 donors', icon: '🏆', rarity: 'epic', isEarned: false },
    { id: '6', name: 'Philanthropy Hero', description: 'Donated over $1,000 total', icon: '🦸', rarity: 'epic', isEarned: false },
    { id: '7', name: 'Legendary Giver', description: 'Donated over $5,000 total', icon: '⭐', rarity: 'legendary', isEarned: false },
    { id: '8', name: 'Community Champion', description: 'Recruited 10+ new donors', icon: '🎖️', rarity: 'legendary', isEarned: false },
];

// Mock User
export const mockUser: User = {
    id: 'user-1',
    name: 'Alex Morgan',
    avatar: '/avatars/alex.jpg',
    totalDonated: 2450,
    impactScore: 8750,
    rank: 156,
    campaignsSupported: 12,
    badges: mockBadges.filter(b => b.isEarned),
    donationHistory: [
        { id: 'd1', campaignId: '1', campaignName: "Sarah's Heart Surgery Fund", amount: 500, date: '2024-02-10', transactionHash: '0xabc123...', status: 'completed' },
        { id: 'd2', campaignId: '3', campaignName: 'Earthquake Relief Fund - Turkey', amount: 250, date: '2024-02-08', transactionHash: '0xdef456...', status: 'completed' },
        { id: 'd3', campaignId: '7', campaignName: 'Emergency Fire Relief - California', amount: 300, date: '2024-02-06', transactionHash: '0xghi789...', status: 'completed' },
        { id: 'd4', campaignId: '9', campaignName: "Children's Cancer Treatment Fund", amount: 400, date: '2024-02-01', transactionHash: '0xjkl012...', status: 'completed' },
        { id: 'd5', campaignId: '2', campaignName: 'Rural School Library Project', amount: 100, date: '2024-01-28', transactionHash: '0xmno345...', status: 'completed' },
    ],
};

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
    { rank: 1, userId: 'u1', name: 'Anonymous Whale', avatar: '/avatars/1.jpg', totalDonated: 125000, campaignsSupported: 45, badges: ['🦸', '⭐', '🎖️'] },
    { rank: 2, userId: 'u2', name: 'Crypto Philanthropist', avatar: '/avatars/2.jpg', totalDonated: 98500, campaignsSupported: 38, badges: ['🦸', '⭐'] },
    { rank: 3, userId: 'u3', name: 'Heart of Giving', avatar: '/avatars/3.jpg', totalDonated: 76200, campaignsSupported: 52, badges: ['🦸', '⭐', '🎖️'] },
    { rank: 4, userId: 'u4', name: 'Blockchain Benefactor', avatar: '/avatars/4.jpg', totalDonated: 54300, campaignsSupported: 29, badges: ['🦸'] },
    { rank: 5, userId: 'u5', name: 'DeFi Donor', avatar: '/avatars/5.jpg', totalDonated: 43100, campaignsSupported: 25, badges: ['🦸'] },
    { rank: 6, userId: 'u6', name: 'Generous Guardian', avatar: '/avatars/6.jpg', totalDonated: 38700, campaignsSupported: 31, badges: ['🏆', '💛'] },
    { rank: 7, userId: 'u7', name: 'Kindness Keeper', avatar: '/avatars/7.jpg', totalDonated: 31200, campaignsSupported: 18, badges: ['🏆', '💛'] },
    { rank: 8, userId: 'u8', name: 'Hope Holder', avatar: '/avatars/8.jpg', totalDonated: 27800, campaignsSupported: 22, badges: ['🏆'] },
    { rank: 9, userId: 'u9', name: 'Charity Champion', avatar: '/avatars/9.jpg', totalDonated: 21500, campaignsSupported: 15, badges: ['🏆'] },
    { rank: 10, userId: 'u10', name: 'Love Giver', avatar: '/avatars/10.jpg', totalDonated: 18900, campaignsSupported: 20, badges: ['💛', '👼'] },
];

// Recent Donations for Ticker
export const recentDonations = [
    { name: 'Anonymous', amount: 100, campaign: "Sarah's Heart Surgery Fund", time: '2 min ago' },
    { name: 'CryptoKing', amount: 500, campaign: 'Earthquake Relief Fund', time: '5 min ago' },
    { name: 'Maria S.', amount: 25, campaign: 'Rural School Library', time: '8 min ago' },
    { name: 'DeFi Donor', amount: 1000, campaign: 'Fire Relief California', time: '12 min ago' },
    { name: 'Anonymous', amount: 50, campaign: 'Ocean Cleanup Project', time: '15 min ago' },
    { name: 'TokenHolder', amount: 250, campaign: "Children's Cancer Fund", time: '18 min ago' },
];

// Platform Statistics
export const platformStats = {
    totalRaised: 12847350,
    livesImpacted: 45672,
    activeCampaigns: 847,
    totalDonors: 23456,
    successfulCampaigns: 1234,
};

export function getCampaignById(id: string): Campaign | undefined {
    return mockCampaigns.find(c => c.id === id);
}

export function getFeaturedCampaigns(): Campaign[] {
    return mockCampaigns.filter(c => c.isHighPriority).slice(0, 4);
}

export function getCampaignsByCategory(category: Campaign['category']): Campaign[] {
    return mockCampaigns.filter(c => c.category === category);
}
