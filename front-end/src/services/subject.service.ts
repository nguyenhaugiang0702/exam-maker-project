import axiosInstance from '@/lib/axios';

export interface Subject {
    _id: string;
    name: string;
    code: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateSubjectData {
    name: string;
    code: string;
    description?: string;
}

export interface UpdateSubjectData {
    name?: string;
    code?: string;
    description?: string;
}

export const subjectService = {
    // Get all subjects
    getAllSubjects: async (): Promise<Subject[]> => {
        const response = await axiosInstance.get<Subject[]>('/subjects');
        return response.data;
    },

    // Get a single subject by ID
    getSubject: async (id: string): Promise<Subject> => {
        const response = await axiosInstance.get<Subject>(`/subjects/${id}`);
        return response.data;
    },

    // Create a new subject
    createSubject: async (data: CreateSubjectData): Promise<Subject> => {
        const response = await axiosInstance.post<Subject>('/subjects', data);
        return response.data;
    },

    // Update an existing subject
    updateSubject: async (id: string, data: UpdateSubjectData): Promise<Subject> => {
        const response = await axiosInstance.patch<Subject>(`/subjects/${id}`, data);
        return response.data;
    },

    // Delete a subject
    deleteSubject: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/subjects/${id}`);
    },
};
