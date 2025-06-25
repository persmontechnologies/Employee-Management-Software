// packages/frontend/src/lib/api-client.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Create a custom Axios instance with default config
const apiClient = axios.create({
  baseURL: '/api', // Uses the proxy from vite.config.ts
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor - runs before each request
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('persmon_auth_token');
    
    // If token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - runs after each response
apiClient.interceptors.response.use(
  (response) => response, // Return successful responses as-is
  (error: AxiosError) => {
    // Handle 401 Unauthorized errors (token expired/invalid)
    if (error.response?.status === 401) {
      // Clear the invalid token
      localStorage.removeItem('persmon_auth_token');
      
      // Redirect to login page
      window.location.href = '/auth/login';
    }
    
    // Handle 403 Forbidden errors (insufficient permissions)
    if (error.response?.status === 403) {
      console.error('Permission denied:', error.response.data);
      // You could redirect to an "access denied" page or show a notification
    }
    
    // Handle 500 and other server errors
    if (error.response?.status && error.response.status >= 500) {
      console.error('Server error:', error.response.data);
      // You could show a "Something went wrong" notification
    }
    
    // Pass the error along to be handled by the caller
    return Promise.reject(error);
  }
);

// Generic typed request methods
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.get(url, config);
  return response.data;
};

export const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.post(url, data, config);
  return response.data;
};

export const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.put(url, data, config);
  return response.data;
};

export const patch = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.patch(url, data, config);
  return response.data;
};

export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.delete(url, config);
  return response.data;
};

export default apiClient;