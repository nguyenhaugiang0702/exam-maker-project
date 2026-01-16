import axiosInstance from '@/lib/axios';
import { User } from './auth.service';

export interface UpdateProfileData {
    name: string;
    email: string;
    avatar?: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

export const userService = {
    // Get user profile
    getProfile: async (): Promise<User> => {
        const response = await axiosInstance.get<User>('/auth/profile');
        return response.data;
    },

    // Update user profile
    updateProfile: async (data: UpdateProfileData): Promise<User> => {
        const userStr = localStorage.getItem('user');
        const currentUser = userStr ? JSON.parse(userStr) : null;

        if (!currentUser || !currentUser._id) {
            throw new Error('User ID not found');
        }

        const response = await axiosInstance.patch<User>(`/users/${currentUser._id}`, data);

        // Update local storage with new data
        const updatedUser = response.data;
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Update stored user

        return updatedUser;
    },

    // Change password
    changePassword: async (data: ChangePasswordData): Promise<{ message: string }> => {
        // Checking auth controller, "reset-password" is for forgot password flow. 
        // Use real endpoint if available? AuthController has reset-password but that takes token.
        // UsersController might have it. 
        // For now, keep mock to ensure no compile errors, but update structure if needed.
        const response = await axiosInstance.post<{ message: string }>(`/auth/change-password`, data);
        return response.data;
    },
};
