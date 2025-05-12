import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useCommentStore = create((set) => ({
	comments: [],
    comment: [],
	loading: false,

	setComments: (comments) => set({ comments }),
	
	createComment: async (commentData) => {
		set({ loading: true });
		try {
			const res = await axios.post("http://localhost:8080/api/comments", commentData, { withCredentials: true });
			set((prevState) => ({
				comments: [...prevState.comments, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},

	fetchAllComments: async () => {
		set({ loading: true });
		try {
			const res = await axios.get("http://localhost:8080/api/comments", { withCredentials: true });
			set({ videos: res.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch comments.", loading: false });
			toast.error(error.response.data.error || "Failed to fetch comments.");
		}
	},

    fetchCommentByVideo: async (id) => {
		set({ loading: true });
		try {
			const res = await axios.get(`http://localhost:8080/api/comments/video/${id}`, { withCredentials: true });
			set({ comment: res.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch comment by video.", loading: false });
			toast.error(error.response.data.error || "Failed to fetch comment by video.");
		}
	},

	deleteComment: async (commentId) => {
		set({ loading: true });
		try {
			await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
			set((prevComments) => ({
				comments: prevComments.comments.filter((comment) => comment.id !== commentId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete comment.");
		}
	},

	createReply: async (replyData) => {
		set({ loading: true });
		try {
			const res = await axios.post("http://localhost:8080/api/replies", replyData, { withCredentials: true });
			set((prevState) => ({
				// Code here
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},
}));