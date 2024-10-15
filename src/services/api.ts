import axios from 'axios';

interface Organization {
    id: string;
    name: string;
    description: string;
    logo: string;
    impact: string;
    address: string;
    verified: number;
}

interface Beneficiary {
    id: string;
    name: string;
    logo: string;
    address: string;
    percentage: number;
}

interface CampaignDetail {
    id: string;
    title: string;
    description: string;
    image: string;
    fund_allocation_description: string;
    organization: Organization;
    beneficiaries: Beneficiary[];
    donation_amount: number;
    donation_count: number;
    created_at: string;
}

interface ApiResponse<T> {
    message: string | null;
    data: T;
}

const api = axios.create({
    baseURL: 'http://aptfund.test/api',
});

export const getVerifiedBeneficiaries = async (): Promise<Organization[]> => {
    try {
        const response = await api.get<ApiResponse<Organization[]>>('/organizations');
        return response.data.data.filter(org => org.verified === 1);
    } catch (error) {
        console.error('Error fetching verified beneficiaries:', error);
        throw error;
    }
};

export const getCampaigns = async (): Promise<CampaignDetail[]> => {
    try {
        const response = await api.get<ApiResponse<CampaignDetail[]>>('/campaigns');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        throw error;
    }
};

export const getCampaignDetail = async (id: string): Promise<CampaignDetail> => {
    try {
        const response = await api.get<ApiResponse<CampaignDetail>>(`/campaigns/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching campaign detail:', error);
        throw error;
    }
};