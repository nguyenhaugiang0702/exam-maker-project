import axiosInstance from '@/lib/axios';
import { User } from './auth.service';

export interface UpdateProfileData {
    fullName: string;
    email: string;
    school: string;
    avatar?: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

// Mock API calls - Replace with real API endpoints
export const userService = {
    // Get user profile
    getProfile: async (): Promise<User> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const userStr = localStorage.getItem('user');
                const user = userStr ? JSON.parse(userStr) : null;
                resolve(user);
            }, 500);
        });

        // Real API call (uncomment when backend is ready)
        // const response = await axiosInstance.get<User>('/user/profile');
        // return response.data;
    },

    // Update user profile
    updateProfile: async (data: UpdateProfileData): Promise<User> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const userStr = localStorage.getItem('user');
                const currentUser = userStr ? JSON.parse(userStr) : {};
                const updatedUser = {
                    ...currentUser,
                    ...data,
                };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                resolve(updatedUser);
            }, 1000);
        });

        // Real API call (uncomment when backend is ready)
        // const response = await axiosInstance.put<User>('/user/profile', data);
        // return response.data;
    },

    // Change password
    changePassword: async (data: ChangePasswordData): Promise<{ message: string }> => {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock validation
                if (data.currentPassword === 'wrong') {
                    reject(new Error('Current password is incorrect'));
                } else {
                    resolve({ message: 'Password changed successfully' });
                }
            }, 1000);
        });

        // Real API call (uncomment when backend is ready)
        // const response = await axiosInstance.post('/user/change-password', data);
        // return response.data;
    },
};
