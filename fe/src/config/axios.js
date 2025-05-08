import axios from "axios";
import { useUserStore } from "../stores/useUserStore"

const axiosInstance = axios.create({
	baseURL: "http://localhost:8080/api",
	withCredentials: true, // Always send cookies
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = useUserStore.getState().token;
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			// Handle unauthorized access
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;