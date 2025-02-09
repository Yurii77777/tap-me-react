import axios from 'axios';

export const instanceForBackend = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add a request interceptor
instanceForBackend.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
