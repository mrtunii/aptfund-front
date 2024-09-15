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

interface ApiResponse {
    message: string | null;
    data: Organization[];
}

const api = axios.create({
    baseURL: 'http://aptfund.test/api',
});

export const getVerifiedBeneficiaries = async (): Promise<Organization[]> => {
    try {
        const response = await api.get<ApiResponse>('/organizations');
        return response.data.data.filter(org => org.verified === 1);
    } catch (error) {
        console.error('Error fetching verified beneficiaries:', error);
        throw error;
    }
};