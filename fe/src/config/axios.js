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

/*
axiosInstance.interceptors.response.use(
	(response) => response,

	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = localStorage.getItem('refreshToken');
			if (refreshToken) {
				try {
					const response = await axios.post(`${BASE_URL}/refreshToken`, {refreshToken});
					// don't use axious instance that already configured for refresh token api call
					const newAccessToken = response.data.accessToken;
					localStorage.setItem('accessToken', newAccessToken);  //set new access token
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					return axios(originalRequest); //recall Api with new token
				} catch (error) {
					// Handle token refresh failure
					// mostly logout the user and re-authenticate by login again
				}
			}
		}

		return Promise.reject(error);
	}
);
*/

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;