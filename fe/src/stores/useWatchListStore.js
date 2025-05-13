import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

export const useWatchListStore = create((set) => ({
	watchList: [],
	loading: false,

	setWatchList: (watchList) => set({ watchList }),
	
	addToWatchList: async (userId, video) => {
        // Avoid duplicates by checking video ID
        const exists = watchList.some(item => item.id === video.id);
        if (exists) return;
		set({ loading: true });
		try {
			const res = await axios.post(`http://localhost:8080/api/watchlist/add/${userId}`, video, { withCredentials: true });
            set({ watchList: [...watchList, video], loading: false });
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},

	fetchWatchList: async (userId) => {
		set({ loading: true });
		try {
			const response = await axios.get(`http://localhost:8080/api/watchlist/user/${userId}`, { withCredentials: true });
			/*
			const token = Cookies.get('token');
			const response = await axios.get("http://localhost:8080/api/videos", {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
			*/
			set({ watchList: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch user's watch list", loading: false });
			toast.error(error.response.data.error || "Failed to fetch user's watch list");
		}
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