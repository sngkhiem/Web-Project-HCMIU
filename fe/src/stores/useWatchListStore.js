import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

export const useWatchListStore = create((set) => ({
	watchList: [],
	loading: false,
	error: null,

	setWatchList: (watchList) => set({ watchList }),
	
	addToWatchList: async (userId, videoId) => {
		set({ loading: true, error: null });
		try {
			const response = await axios.post(
				'http://localhost:8080/api/watchlist',
				{ userId, videoId },
				{ withCredentials: true }
			);
			set((state) => ({
				watchList: [...state.watchList, response.data],
				loading: false
			}));
		} catch (error) {
			set({ error: error.message, loading: false });
			throw error;
		}
	},

	fetchWatchList: async (userId) => {
		set({ loading: true, error: null });
		try {
			const response = await axios.get(`http://localhost:8080/api/watchlist/${userId}`, { withCredentials: true });
			set({ watchList: response.data, loading: false });
		} catch (error) {
			set({ error: error.message, loading: false });
			throw error;
		}
	},

	removeFromWatchList: async (userId, videoId) => {
		set({ loading: true, error: null });
		try {
			await axios.delete(`http://localhost:8080/api/watchlist/${userId}/${videoId}`, { withCredentials: true });
			set((state) => ({
				watchList: state.watchList.filter(item => item.videoId !== videoId),
				loading: false
			}));
		} catch (error) {
			set({ error: error.message, loading: false });
			throw error;
		}
	},

	isInWatchList: (videoId) => {
		return useWatchListStore.getState().watchList.some(item => item.videoId === videoId);
	},

	deleteVideo: async (videoId) => {
		set({ loading: true });
		try {
			const token = Cookies.get('token');
			await axios.delete(`/videos/${videoId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
			set((prevVideos) => ({
				videos: prevVideos.videos.filter((video) => video._id !== videoId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete video");
		}
	}
}));