import axios from 'axios';

interface Organization {
    id: string;
    name: string;
    description: string;
    logo: string;
    impact: string;
    address: string;
    verified: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

interface Campaign {
    id: string;
    title: string;
    description: string;
    image: string;
    organization: Organization;
    donation_amount: number;
    donation_count: number;
    created_at: string;
}

interface ApiResponse<T> {
    message: string | null;
    data: T[];
}

const api = axios.create({
    baseURL: 'http://aptfund.test/api',
});

export const getVerifiedBeneficiaries = async (): Promise<Organization[]> => {
    try {
        const response = await api.get<ApiResponse<Organization>>('/organizations');
        return response.data.data.filter(org => org.verified === 1);
    } catch (error) {
        console.error('Error fetching verified beneficiaries:', error);
        throw error;
    }
};

export const getCampaigns = async (): Promise<Campaign[]> => {
    try {
        const response = await api.get<ApiResponse<Campaign>>('/campaigns');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        throw error;
    }
};