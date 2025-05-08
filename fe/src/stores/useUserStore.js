import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
	user: null,
	loading: false,
	checkingAuth: false,
	isUpdatingProfile: false,

	signup: async ({ username, email, phoneNumber, password }) => {
		set({ loading: true });
		try {
			await axios.post("/auth/signup", { username, email, phoneNumber, password });
			toast.success("Signup successful. Please login.");
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred during signup");
		} finally {
			set({ loading: false });
		}
	},

	login: async (username, password) => {
		set({ loading: true });
		try {
			const res = await axios.post("http://localhost:8080/api/auth/signin", 
				{ username, password },
				{ withCredentials: true }
			);
			const { token, ...userData } = res.data;

			set({
				user: userData,
				loading: false
			});
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.message || "Login failed");
		}
	},

	logout: async () => {
		try {
			await axios.post("http://localhost:8080/api/auth/logout", {}, { withCredentials: true });
			set({ user: null });
		} catch (error) {
			toast.error(error.response?.data?.message || "Error during logout");
		}
	},

	updateProfile: async (data) => {
		set({ isUpdatingProfile: true });
		try {
			const res = await axios.put("http://localhost:8080/api/users/update-profile", 
				data,
				{ withCredentials: true }
			);
			set({ user: res.data });
			toast.success("Profile updated successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "Error updating profile");
		} finally {
			set({ isUpdatingProfile: false });
		}
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const res = await axios.get("http://localhost:8080/api/auth/me", { withCredentials: true });
			set({
				user: res.data,
				checkingAuth: false
			});
		} catch (error) {
			set({ checkingAuth: false, user: null });
		}
	}
}));
