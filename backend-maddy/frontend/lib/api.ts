/**
 * API Service for HeartChain Frontend (Decentralized / Stateless)
 */

// Backend API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types
export type CampaignType = 'individual' | 'charity';
export type PriorityLevel = 'urgent' | 'normal';
export type CampaignStatus = 'active' | 'completed';

export type DocumentType =
    | 'medical_bill'
    | 'doctor_prescription'
    | 'hospital_letter'
    | 'id_proof'
    | 'ngo_certificate'
    | 'license'
    | 'trust_deed'
    | 'other';

export interface CampaignDocument {
    ipfs_hash: string;
    document_type: DocumentType;
    filename: string;
    mime_type: string;
    uploaded_at?: string;
}

export interface IndividualCampaignCreateRequest {
    title: string;
    description: string;
    target_amount: number;
    duration_days: number;
    category: string;
    priority?: PriorityLevel;
    hospitalId?: string;
    image_url?: string;
    beneficiary_name: string;
    phone_number: string;
    residential_address: string;
    verification_notes?: string;
    documents?: CampaignDocument[];
}

export interface CharityCampaignCreateRequest {
    title: string;
    description: string;
    target_amount: number;
    duration_days: number;
    category: string;
    priority?: PriorityLevel;
    hospitalId?: string;
    image_url?: string;
    organization_name: string;
    contact_person_name: string;
    contact_phone_number: string;
    official_address: string;
    verification_notes?: string;
    documents?: CampaignDocument[];
}

export interface CreateResponse {
    tx_hash: string;
    cid: string;
    campaign_address?: string;
    status: string;
}

export interface Donation {
    donor: string;
    amount: number;
    timestamp: string;
    txHash: string;
}

// Frontend Representation of a Campaign (Stored in LocalStorage for MVP)
export interface MockCampaign {
    id: string; // CID
    _id?: string; // Backwards compatibility
    cid: string;
    campaign_type: CampaignType;
    title: string;
    description: string;
    target_amount: number;
    raised_amount: number;
    duration_days: number;
    category: string;
    priority: PriorityLevel;
    status: CampaignStatus;
    image_url: string | null;
    organization_name?: string | null;
    created_at: string;
    end_date?: string; // Derived
    blockchain_tx_hash: string | null;
    on_chain_id?: string | null;
    documents_count?: number;
    hospitalId?: string;
    donations?: Donation[];
}

export type CampaignPublicResponse = MockCampaign;


class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const defaultHeaders = { 'Content-Type': 'application/json' };

        const response = await fetch(url, {
            ...options,
            headers: { ...defaultHeaders, ...options.headers },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
            throw new Error(error.detail || `HTTP ${response.status}`);
        }
        return response.json();
    }

    // Helper to save campaign to LocalStorage (Simulating Blockchain Indexer)
    private saveToLocalIndex(campaign: MockCampaign) {
        if (typeof window !== 'undefined') {
            const existing = JSON.parse(localStorage.getItem('heartchain_campaigns') || '[]');
            existing.unshift(campaign); // Add to top
            localStorage.setItem('heartchain_campaigns', JSON.stringify(existing));
        }
    }

    // ============== CREATE ==============

    async createIndividualCampaign(data: IndividualCampaignCreateRequest): Promise<CreateResponse> {
        const res = await this.request<CreateResponse>('/campaigns/individual', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        // Save to mock storage so it appears in Browse
        this.saveToLocalIndex({
            id: res.cid,
            cid: res.cid,
            campaign_type: 'individual',
            title: data.title,
            description: data.description,
            target_amount: data.target_amount,
            raised_amount: 0,
            duration_days: data.duration_days,
            category: data.category,
            priority: data.priority || 'normal',
            status: 'active',
            image_url: data.image_url || null,
            created_at: new Date().toISOString(),
            blockchain_tx_hash: res.tx_hash,
            on_chain_id: res.campaign_address,
            hospitalId: data.hospitalId,
            donations: []
        });

        return res;
    }

    async createCharityCampaign(data: CharityCampaignCreateRequest): Promise<CreateResponse> {
        const res = await this.request<CreateResponse>('/campaigns/charity', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        this.saveToLocalIndex({
            id: res.cid,
            cid: res.cid,
            campaign_type: 'charity',
            title: data.title,
            description: data.description,
            target_amount: data.target_amount,
            raised_amount: 0,
            duration_days: data.duration_days,
            category: data.category,
            priority: data.priority || 'normal',
            status: 'active',
            image_url: data.image_url || null,
            organization_name: data.organization_name,
            created_at: new Date().toISOString(),
            blockchain_tx_hash: res.tx_hash,
            on_chain_id: res.campaign_address,
            hospitalId: data.hospitalId,
            donations: []
        });

        return res;
    }

    // ============== BROWSE (MOCK FETCH) ==============

    async getCampaigns(params?: any): Promise<MockCampaign[]> {
        // Return from LocalStorage instead of Backend API (which is removed)
        if (typeof window !== 'undefined') {
            let campaigns: MockCampaign[] = JSON.parse(localStorage.getItem('heartchain_campaigns') || '[]');
            // Basic filtering logic
            if (params?.campaign_type) {
                campaigns = campaigns.filter(c => c.campaign_type === params.campaign_type);
            }
            if (params?.category) {
                campaigns = campaigns.filter(c => c.category === params.category);
            }
            return campaigns;
        }
        return [];
    }

    async getCampaign(id: string): Promise<MockCampaign | null> {
        if (typeof window !== 'undefined') {
            const campaigns: MockCampaign[] = JSON.parse(localStorage.getItem('heartchain_campaigns') || '[]');
            return campaigns.find(c => c.id === id) || null;
        }
        return null;
    }

    // ============== DONATIONS (HYBRID) ==============

    async donateToCampaign(id: string, amount: number, donorAddress: string): Promise<boolean> {
        if (typeof window !== 'undefined') {
            let campaigns: MockCampaign[] = JSON.parse(localStorage.getItem('heartchain_campaigns') || '[]');

            // Fix: If campaign not in local storage, try to find in mock data and add it
            let index = campaigns.findIndex(c => c.id === id);
            if (index === -1) {
                // Import dynamically to avoid circle if needed, or assume global mockCampaigns if imported
                // For now, let's assume valid ID means it exists in our "System".
                // We create a skeleton or try to fetch.
                // Since we can't easily import 'mockData' here if not already, let's just create a new entry with ID.
                const newCampaign: MockCampaign = {
                    id: id,
                    cid: id, // CID is also ID
                    campaign_type: 'individual', // Default type
                    title: `Campaign ${id}`, // Fallback title
                    description: '...',
                    raised_amount: 0,
                    target_amount: 1000, // Dummy
                    duration_days: 30, // Dummy
                    category: 'community',
                    priority: 'normal',
                    status: 'active',
                    image_url: null,
                    created_at: new Date().toISOString(),
                    blockchain_tx_hash: null,
                    donations: []
                };

                // Try to fill details if possible, but minimal requirement is ID for UserStats
                try {
                    const { mockCampaigns } = await import('@/data/mockData');
                    const found = mockCampaigns.find(c => c.id === id);
                    if (found) {
                        Object.assign(newCampaign, found);
                    }
                } catch (e) { console.warn("Could not load mocks", e); }

                campaigns.push(newCampaign);
                index = campaigns.length - 1;
            }

            if (index !== -1) {
                const campaign = campaigns[index];

                // PATH 1: Real Blockchain Donation
                if (campaign.on_chain_id) {
                    try {
                        console.log("Attempting Blockchain Donation to:", campaign.on_chain_id);
                        const { ethers } = await import('ethers');

                        // Check for MetaMask
                        if (!(window as any).ethereum) {
                            alert("MetaMask is required for blockchain campaigns!");
                            return false;
                        }

                        const provider = new ethers.BrowserProvider((window as any).ethereum);
                        const signer = await provider.getSigner();

                        const CAMPAIGN_ABI = ["function donate() external payable"];
                        const contract = new ethers.Contract(campaign.on_chain_id, CAMPAIGN_ABI, signer);

                        const tx = await contract.donate({
                            value: ethers.parseEther(amount.toString())
                        });
                        console.log("Transaction sent:", tx.hash);

                        campaign.blockchain_tx_hash = tx.hash;

                    } catch (error) {
                        console.error("Blockchain Donation failed:", error);
                        // Allowing Fallback to Mock if user cancels? 
                        // For now return false
                        alert("Blockchain transaction failed. Please check your wallet funds and network.");
                        return false;
                    }
                } else {
                    console.warn("No on-chain ID found. Falling back to MOCK donation.");
                }

                // PATH 2: Local State Update (Shared for both Mock & Real)
                // This simulates the indexer picking up the event
                campaign.raised_amount += amount;
                if (campaign.raised_amount >= campaign.target_amount && campaign.status === 'active') {
                    campaign.status = 'completed';
                }

                if (!campaign.donations) campaign.donations = [];
                campaign.donations.unshift({
                    donor: donorAddress,
                    amount: amount,
                    timestamp: new Date().toISOString(),
                    txHash: campaign.blockchain_tx_hash || ("0xMOCK_" + Math.random().toString(36).substr(2, 9))
                });
                localStorage.setItem('heartchain_campaigns', JSON.stringify(campaigns));

                return true;
            }
        }
        return false;
    }

    // ============== DOCUMENTS ==============

    async uploadDocument(file: File, documentType: DocumentType): Promise<CampaignDocument> {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('document_type', documentType);

        const response = await fetch(`${this.baseUrl}/documents/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        return response.json();
    }

    // ============== DATA AGGREGATION (Profile & Leaderboard) ==============

    async getUserStats(address: string): Promise<{ totalDonated: number; campaignsSupported: number; donations: any[] }> {
        if (typeof window !== 'undefined') {
            const campaigns: MockCampaign[] = JSON.parse(localStorage.getItem('heartchain_campaigns') || '[]');
            let totalDonated = 0;
            let supportedCampaignIds = new Set<string>();
            let myDonations: any[] = [];

            campaigns.forEach(campaign => {
                if (campaign.donations) {
                    campaign.donations.forEach(donation => {
                        if (donation.donor.toLowerCase() === address.toLowerCase()) {
                            totalDonated += donation.amount;
                            supportedCampaignIds.add(campaign.id);
                            myDonations.push({
                                ...donation,
                                campaignTitle: campaign.title,
                                campaignId: campaign.id
                            });
                        }
                    });
                }
            });

            return {
                totalDonated,
                campaignsSupported: supportedCampaignIds.size,
                donations: myDonations.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            };
        }
        return { totalDonated: 0, campaignsSupported: 0, donations: [] };
    }


    // ============== HOSPITAL VERIFICATION ==============

    async verifyHospitalLogin(adminId: string, hospitalId: string): Promise<boolean> {
        // Dynamic import to verify against mock data
        try {
            const { mockHospitals } = await import('@/data/mockData');
            const hospital = mockHospitals.find(h => h.id === hospitalId && h.adminId === adminId);
            return !!hospital;
        } catch (e) {
            console.error('Login verification failed', e);
            return false;
        }
    }

    async getHospitalCampaigns(hospitalId: string): Promise<MockCampaign[]> {
        if (typeof window !== 'undefined') {
            // Get mock campaigns from storage + initial seed
            let campaigns: MockCampaign[] = JSON.parse(localStorage.getItem('heartchain_campaigns') || '[]');

            // If storage is empty, we might need to seed it from mockData to test this flow
            if (campaigns.length === 0) {
                const { mockCampaigns } = await import('@/data/mockData');
                // Only seed if we actually need to
                campaigns = mockCampaigns.map(c => ({
                    ...c,
                    id: c.id,
                    cid: c.id,
                    campaign_type: 'individual',
                    target_amount: c.goal,
                    raised_amount: c.raised,
                    duration_days: c.daysLeft,
                    status: c.raised >= c.goal ? 'completed' : 'active',
                    image_url: c.image,
                    created_at: c.createdAt,
                    priority: c.isHighPriority ? 'urgent' : 'normal',
                    blockchain_tx_hash: null,
                    // Map hospitalId if present in mockData
                    hospitalId: (c as any).hospitalId
                })) as any;

                localStorage.setItem('heartchain_campaigns', JSON.stringify(campaigns));
            }

            // Filter for this hospital AND completed/fully-funded
            return campaigns.filter((c: any) =>
                c.hospitalId === hospitalId &&
                ((c.raised_amount >= c.target_amount) || c.status === 'completed' || c.status === 'funds_released')
            );
        }
        return [];
    }

    async releaseFunds(campaignId: string): Promise<{ success: boolean; txHash?: string }> {
        if (typeof window !== 'undefined') {
            const campaigns: MockCampaign[] = JSON.parse(localStorage.getItem('heartchain_campaigns') || '[]');
            const index = campaigns.findIndex(c => c.id === campaignId);

            if (index !== -1) {
                const campaign = campaigns[index];

                // Simulate Blockchain Transaction
                const mockTxHash = "0x" + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');

                campaign.status = 'funds_released' as any;
                (campaign as any).fundsReleasedTxHash = mockTxHash;

                localStorage.setItem('heartchain_campaigns', JSON.stringify(campaigns));

                // Force a short delay to simulate network
                await new Promise(resolve => setTimeout(resolve, 2000));

                return { success: true, txHash: mockTxHash };
            }
        }
        return { success: false };
    }
}

export const api = new ApiClient(API_BASE_URL);
export { API_BASE_URL };
