import axios from "axios";

const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://68d40690214be68f8c68234e.mockapi.io",
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    // console.log("API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // console.log("API Response:", response.status, response.data);
    return response;
  },
  (error) => {
    // console.log("API Error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
