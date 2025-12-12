import axiosInstance from '@/lib/axios';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    fullName: string;
    email: string;
    school: string;
    password: string;
}

export interface User {
    id: string;
    fullName: string;
    email: string;
    school: string;
    avatar?: string;
    createdAt: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

// Mock API calls - Replace with real API endpoints
export const authService = {
    // Login
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (credentials.email && credentials.password) {
                    const mockResponse: AuthResponse = {
                        token: 'mock-jwt-token-' + Date.now(),
                        user: {
                            id: '1',
                            fullName: 'Nguyễn Văn A',
                            email: credentials.email,
                            school: 'THPT ABC',
                            avatar: '',
                            createdAt: new Date().toISOString(),
                        },
                    };
                    resolve(mockResponse);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });

        // Real API call (uncomment when backend is ready)
        // const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
        // return response.data;
    },

    // Register
    register: async (data: RegisterData): Promise<AuthResponse> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockResponse: AuthResponse = {
                    token: 'mock-jwt-token-' + Date.now(),
                    user: {
                        id: '1',
                        fullName: data.fullName,
                        email: data.email,
                        school: data.school,
                        avatar: '',
                        createdAt: new Date().toISOString(),
                    },
                };
                resolve(mockResponse);
            }, 1000);
        });

        // Real API call (uncomment when backend is ready)
        // const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
        // return response.data;
    },

    // Forgot password
    forgotPassword: async (email: string): Promise<{ message: string }> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ message: 'Password reset link sent to email' });
            }, 1000);
        });

        // Real API call (uncomment when backend is ready)
        // const response = await axiosInstance.post('/auth/forgot-password', { email });
        // return response.data;
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
