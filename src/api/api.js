import axios from "axios";

//const API_BASE_URL = "https://bffapi.biztel.ai:8080/api/auth";
const API_BASE_URL = "https://bffapi.biztel.ai:8080/api/auth";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests to add additional headers if needed (e.g., Authorization tokens)
api.interceptors.request.use(
  (config) => {
    // Example: Attach a token if available
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response ? error.response.data : error.message);
  }
);

export default api;