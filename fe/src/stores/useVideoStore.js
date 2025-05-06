import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useVideoStore = create((set) => ({
	videos: [],
	video: [],
	loading: false,

	setVideos: (videos) => set({ videos }),
	
	createVideo: async (videoData) => {
		set({ loading: true });
		try {
			const res = await axios.post("/videos", videoData);
			set((prevState) => ({
				videos: [...prevState.videos, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},

	fetchAllVideos: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("http://localhost:8080/api/videos");
			set({ videos: response.data.videos, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch videos", loading: false });
			toast.error(error.response.data.error || "Failed to fetch videos");
		}
	},

	fetchVideo: async (id) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/videos/${id}`);
			set({ video: response.data.video, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch videos", loading: false });
			toast.error(error.response.data.error || "Failed to fetch videos");
		}
	},

	fetchVideosByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/videos/category/${category}`);
			set({ videos: response.data.videos, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch videos", loading: false });
			toast.error(error.response.data.error || "Failed to fetch videos");
		}
	},
	
	deleteVideo: async (videoId) => {
		set({ loading: true });
		try {
			await axios.delete(`/videos/${videoId}`);
			set((prevVideos) => ({
				videos: prevVideos.videos.filter((video) => video._id !== videoId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete video");
		}
	},

	fetchReviews: async (videoId) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/ratings`);
			set({ reviews: response.data.video.reviews, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch reviews", loading: false });
			toast.error(error.response.data.error || "Failed to fetch videos");
		}
	},

	createReview: async (videoId, reviewData) => {
		set({ loading: true });
		try {
			const res = await axios.post(`/ratings`, reviewData);
			console.log(res.data)
			set((prevState) => ({
				reviews: [...prevState.reviews, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},
}));