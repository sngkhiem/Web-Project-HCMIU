import axios from "axios";
import { useUserStore } from "../stores/useUserStore"

const axiosInstance = axios.create({
	baseURL: "http://localhost:8080/api",
	withCredentials: true, // send cookies to the server
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
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = localStorage.getItem('refreshToken');
			if (refreshToken) {
				try {
					const response = await axios.post("http://localhost:8080/api/auth/refreshToken", {refreshToken});

					const newAccessToken = response.data.accessToken;
					localStorage.setItem('accessToken', newAccessToken);
					

					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

					return axios(originalRequest);
					
				} catch (error) {
					useUserStore.getState().logout();
					return Promise.reject(refreshError);
				}
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;