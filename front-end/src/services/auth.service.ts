import axiosInstance from '@/lib/axios';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    createdAt?: string;
}

export interface AuthResponse {
    access_token: string;
    user: User;
}

export const authService = {
    // Login
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    // Register
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    // Forgot password
    forgotPassword: async (email: string): Promise<{ message: string }> => {
        const response = await axiosInstance.post('/auth/forgot-password', { email });
        return response.data;
    },

    // Logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get current user
    getCurrentUser: (): User | null => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
        return null;
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('token');
    },
};
