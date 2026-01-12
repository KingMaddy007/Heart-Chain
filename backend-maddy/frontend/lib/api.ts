/**
 * API Service for HeartChain Frontend
 * Handles all communication with the backend
 */

// Backend API URL - configurable via environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Campaign Types
export type CampaignType = 'individual' | 'charity';

// Campaign Status
export type CampaignStatus = 'draft' | 'pending_verification' | 'approved' | 'active' | 'closed' | 'rejected';

// Priority Level
export type PriorityLevel = 'urgent' | 'normal';

// Document Types
export type DocumentType =
    | 'medical_bill'
    | 'doctor_prescription'
    | 'hospital_letter'
    | 'id_proof'
    | 'ngo_certificate'
    | 'license'
    | 'trust_deed'
    | 'other';

// ============== REQUEST TYPES ==============

export interface IndividualCampaignCreateRequest {
    title: string;
    description: string;
    target_amount: number;
    duration_days: number;
    category: string;
    priority?: PriorityLevel;
    image_url?: string;
    beneficiary_name: string;
    phone_number: string;
    residential_address: string;
    verification_notes?: string;
}

export interface CharityCampaignCreateRequest {
    title: string;
    description: string;
    target_amount: number;
    duration_days: number;
    category: string;
    priority?: PriorityLevel;
    image_url?: string;
    organization_name: string;
    contact_person_name: string;
    contact_phone_number: string;
    official_address: string;
    verification_notes?: string;
}

// ============== RESPONSE TYPES ==============

export interface CampaignPublicResponse {
    _id: string;
    id: string;  // Added for frontend compatibility
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
    organization_name: string | null;
    documents_count: number;
    created_at: string;
    end_date: string;
    blockchain_tx_hash: string | null;
    on_chain_id: string | null;  // Placeholder for future smart contract integration
}

export interface ApiError {
    detail: string;
}

// ============== API CLIENT ==============

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const defaultHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
            throw new Error(error.detail || `HTTP ${response.status}`);
        }

        return response.json();
    }

    // ============== CAMPAIGN ENDPOINTS ==============

    /**
     * Create an individual/personal campaign
     */
    async createIndividualCampaign(data: IndividualCampaignCreateRequest): Promise<CampaignPublicResponse> {
        return this.request<CampaignPublicResponse>('/campaigns/individual', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    /**
     * Create a charity/organization campaign
     */
    async createCharityCampaign(data: CharityCampaignCreateRequest): Promise<CampaignPublicResponse> {
        return this.request<CampaignPublicResponse>('/campaigns/charity', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    /**
     * Get all active campaigns
     */
    async getCampaigns(params?: {
        campaign_type?: CampaignType;
        category?: string;
        limit?: number;
    }): Promise<CampaignPublicResponse[]> {
        const searchParams = new URLSearchParams();
        if (params?.campaign_type) searchParams.set('campaign_type', params.campaign_type);
        if (params?.category) searchParams.set('category', params.category);
        if (params?.limit) searchParams.set('limit', params.limit.toString());

        const query = searchParams.toString();
        return this.request<CampaignPublicResponse[]>(`/campaigns/${query ? `?${query}` : ''}`);
    }

    /**
     * Get a single campaign by ID
     */
    async getCampaign(campaignId: string): Promise<CampaignPublicResponse> {
        return this.request<CampaignPublicResponse>(`/campaigns/${campaignId}`);
    }

    /**
     * Submit a campaign for verification
     */
    async submitForVerification(campaignId: string): Promise<CampaignPublicResponse> {
        return this.request<CampaignPublicResponse>(`/campaigns/${campaignId}/submit`, {
            method: 'POST',
        });
    }

    /**
     * Close an active campaign
     */
    async closeCampaign(campaignId: string, reason?: string): Promise<CampaignPublicResponse> {
        const params = reason ? `?reason=${encodeURIComponent(reason)}` : '';
        return this.request<CampaignPublicResponse>(`/campaigns/${campaignId}/close${params}`, {
            method: 'PUT',
        });
    }

    // ============== DOCUMENT ENDPOINTS ==============

    /**
     * Upload a document for a campaign
     */
    async uploadDocument(
        campaignId: string,
        file: File,
        documentType: DocumentType
    ): Promise<{ ipfs_hash: string; filename: string }> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('document_type', documentType);

        const response = await fetch(`${this.baseUrl}/documents/${campaignId}/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ detail: 'Upload failed' }));
            throw new Error(error.detail);
        }

        return response.json();
    }

    // ============== HEALTH CHECK ==============

    /**
     * Check API health status
     */
    async healthCheck(): Promise<{
        status: string;
        database: string;
        encryption: string;
    }> {
        return this.request('/health');
    }
}

// Export singleton instance
export const api = new ApiClient(API_BASE_URL);

// Export the base URL for reference
export { API_BASE_URL };
