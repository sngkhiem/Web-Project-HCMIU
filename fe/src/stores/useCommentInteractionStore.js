import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useCommentInteractionStore = create((set) => ({
    loading: false,
    error: null,

    likeComment: async (commentId, userId) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(
                'http://localhost:8080/api/comment-ratings',
                { commentId, userId },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            set({ error: error.message });
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    removeLike: async (commentId) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/comment-ratings/${commentId}`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            set({ error: error.message });
            throw error;
        } finally {
            set({ loading: false });
        }
    }
})); 