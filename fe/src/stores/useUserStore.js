import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
	user: null,
	token: localStorage.getItem('token') || null,
	accessToken: null,
	refreshToken: null,

	loading: false,
	checkingAuth: true,
	isUpdatingProfile: false,

	signup: async ({ username, email, phoneNumber, password }) => {
		set({ loading: true });

		try {
			const res = await axios.post("/auth/signup", { username, email, phoneNumber, password });
			set({ user: res.data, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred");
		}
	},

	login: async (username, password) => {
		set({ loading: true });

		try {
			console.log(username, password)
			const res = await axios.post("http://localhost:8080/api/auth/signin", { username, password } );
			set({ user: res.data, token: res.data.token, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken, loading: false });

			console.log(res.data.refreshToken)
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred");
		}
	},

	logout: async () => {
		try {
			await axios.post("http://localhost:8080/api/auth/logout");
			set({ user: null });
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred during logout");
		}
	},

	updateProfile: async (data) => {
		set({ isUpdatingProfile: true });
		try {
		  	const res = await axios.put("/update-profile", data);
		  	set({ user: res.data });
		  	toast.success("Profile updated successfully");
		} catch (error) {
		  	console.log("error in update profile:", error);
		  	toast.error(error.response.data.message);
		} finally {
		  	set({ isUpdatingProfile: false });
		}
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const res = await axios.get("http://localhost:8080/api/users/2");
			console.log("Data is" + res.data)
			set({ user: res.data, token: res.data.token, checkingAuth: false });
		} catch (error) {
			console.log(error.message);
			set({ checkingAuth: false, user: null });
		}
	},

	refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("http://localhost:8080/api/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}));