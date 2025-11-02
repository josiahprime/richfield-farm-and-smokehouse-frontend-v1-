import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/auth/useAuthStore';

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  withCredentials: true, // sends HttpOnly cookies automatically
});

let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: unknown) => void }[] = [];

const processQueue = (error: Error | null) => {
  console.log('🔁 Processing queue', { queueLength: failedQueue.length, error: error?.message });
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(true);
  });
  failedQueue = [];
};

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// Request interceptor: no Authorization header needed with HttpOnly cookies
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor for auto-refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    // If it's already a retry or a refresh endpoint itself → bail out immediately
    if (originalRequest?._retry || originalRequest?.url?.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosInstance(originalRequest));
      }

      isRefreshing = true;

      try {
        console.log('🔄 Refreshing access token...');
        await axiosInstance.get('/auth/refresh');
        processQueue(null);
        originalRequest._retry = true;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('❌ Refresh failed', refreshError);
        processQueue(refreshError as Error);

        // Avoid recursive logout calls triggering interceptor again
        const store = useAuthStore.getState();
        if (store.authUser) {
          store.logout?.();
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;



// // ✅ Create Axios instance
// export const axiosInstance = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
//   withCredentials: true,
// });





// // ✅ Zustand token access
// const getAccessToken = () => useAuthStore.getState().accessToken;
// const setAccessToken = (token: string) => useAuthStore.getState().setAccessToken(token);
// const refreshAccessToken = () => useAuthStore.getState().refreshAccessToken();
// const logout = () => useAuthStore.getState().logout?.();

// interface FailedRequest {
//   resolve: (value?: unknown) => void;
//   reject: (reason?: unknown) => void
// }

// let isRefreshing = false;
// export let isLoggingOut = false;
// export const setIsLoggingOut = (val: boolean) => {
//   isLoggingOut = val;
// };
// let failedQueue: FailedRequest[] = [];

// const processQueue = (error: Error | null, token: string | null = null) => {
//   console.log('🔁 Processing queue...', { error, token });
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// interface RetryAxiosRequestConfig extends AxiosRequestConfig {
//   _retry?: boolean;
// }

// // ✅ Request Interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getAccessToken();
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     } else {
//       delete config.headers['Authorization'];
//     }
//     return config;
//   },
//   (error) => {
//     console.error('❌ Request error:', error);
//     return Promise.reject(error);
//   }
// );

// // ✅ Response Interceptor

// axiosInstance.interceptors.response.use(
//   res => res,
//   async (err: AxiosError) => {
//     const originalRequest = err.config as RetryAxiosRequestConfig;


//     if (err.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           originalRequest.headers = originalRequest.headers || {};
//           originalRequest.headers['Authorization'] = `Bearer ${token}`;
//           return axiosInstance(originalRequest);
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const newToken = await refreshAccessToken();
//         setAccessToken(newToken);
//         processQueue(null, newToken);
//         originalRequest.headers = originalRequest.headers || {};
//         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError as Error, null);
//         // if (!isLoggingOut) logout?.();
//         if (!isLoggingOut && useAuthStore.getState().authUser) {
//           setIsLoggingOut(true);
//           logout?.();
//         }
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(err);
//   }
// );


// export default axiosInstance;

