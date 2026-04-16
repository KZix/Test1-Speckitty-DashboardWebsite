import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost/api',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// For Sanctum, we should ensure CSRF is handled
apiClient.interceptors.request.use(async (config) => {
  // If we are doing cookie-based auth, Sanctum handles this via the XSRF-TOKEN cookie
  // and X-XSRF-TOKEN header automatically if withCredentials is true and the cookie is present.
  return config;
});
