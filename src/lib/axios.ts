import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/auth/useAuthStore';

// ✅ Create Axios instance
export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  withCredentials: true,
});

// ✅ Zustand token access
const getAccessToken = () => useAuthStore.getState().accessToken;
const setAccessToken = (token: string) => useAuthStore.getState().setAccessToken(token);
const refreshAccessToken = () => useAuthStore.getState().refreshAccessToken();
const logout = () => useAuthStore.getState().logout?.();

interface FailedRequest {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
  console.log('🔁 Processing queue...', { error, token });
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// ✅ Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('➡️ Request with token:', token);
    } else {
      console.log('➡️ Request WITHOUT token');
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
  res => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as RetryAxiosRequestConfig;

    console.log('[Interceptor] Received error:', err?.response?.status);

    if (err.response?.status === 401 && !originalRequest._retry) {
      console.log('[Interceptor] 401 detected. Checking refresh state...');

      if (isRefreshing) {
        console.log('[Interceptor] Already refreshing — queueing request...');
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          console.log('[Interceptor] Retrying request from queue with new token...');
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      console.log('[Interceptor] Refreshing token...');

      return new Promise(async (resolve, reject) => {
        try {
          const newToken = await refreshAccessToken();
          console.log('[Interceptor] Token refreshed:', newToken);

          setAccessToken(newToken);
          processQueue(null, newToken);

          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          resolve(axiosInstance(originalRequest));
        } catch (refreshError) {
          console.log('[Interceptor] Refresh failed. Logging out...', refreshError);
          processQueue(refreshError, null);
          logout?.(); // Optional: logout if refresh fails
          reject(refreshError);
        } finally {
          isRefreshing = false;
          console.log('[Interceptor] Refresh process ended.');
        }
      });
    }

    return Promise.reject(err);
  }
);


export default axiosInstance;

// import axios, { AxiosError, AxiosRequestConfig } from 'axios';
// import { useAuthStore } from '../store/auth/useAuthStore';

// // ✅ Create Axios instance
// export const axiosInstance = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
//   withCredentials: true, // Send cookies (refresh token)
// });

// // ✅ Zustand token access
// const getAccessToken = () => useAuthStore.getState().accessToken;
// const setAccessToken = (token: string) => useAuthStore.getState().setAccessToken(token);
// const refreshAccessToken = () => useAuthStore.getState().refreshAccessToken();
// const logout = () => useAuthStore.getState().logout?.(); // Optional

// // ✅ Define type for failed requests
// interface FailedRequest {
//   resolve: (value?: unknown) => void;
//   reject: (reason?: any) => void;
// }

// let isRefreshing = false;
// let failedQueue: FailedRequest[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// // ✅ Extend Axios config to include `_retry`
// interface RetryAxiosRequestConfig extends AxiosRequestConfig {
//   _retry?: boolean;
// }

// // ✅ Request Interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getAccessToken();
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
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

//       return new Promise(async (resolve, reject) => {
//         try {
//           const newToken = await refreshAccessToken();
//           setAccessToken(newToken);
//           processQueue(null, newToken);
//           originalRequest.headers = originalRequest.headers || {};
//           originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//           resolve(axiosInstance(originalRequest));
//         } catch (refreshError) {
//           processQueue(refreshError, null);
//           logout?.(); // Optional: logout if refresh fails
//           reject(refreshError);
//         } finally {
//           isRefreshing = false;
//         }
//       });
//     }

//     return Promise.reject(err);
//   }
// );

// export default axiosInstance;

// import axios from 'axios';
// import { useAuthStore } from 'store/auth/useAuthStore';

// export const axiosInstance = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
//   withCredentials: true,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = useAuthStore.getState().accessToken;
//     console.log('access token from axios', accessToken)

//     // ✅ Only set Authorization header if token exists
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     } else {
//       // ❌ Explicitly remove it if no token exists
//       delete config.headers.Authorization;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// axiosInstance.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;

//     // ⛔ Prevent infinite loop
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes('/auth/login') &&
//       !originalRequest.url.includes('/auth/refresh')
//     ) {
//       originalRequest._retry = true;

//       try {
//         console.log('[REFRESH FLOW] Trying to refresh access token...');
//         const res = await axiosInstance.post('/auth/refresh');

//         const newAccessToken = res.data.accessToken;

//         console.log('[REFRESH FLOW] Got new token:', newAccessToken);

//         // ✅ Store in Zustand
//         useAuthStore.getState().setAccessToken(newAccessToken);

//         // ✅ Retry original request with new token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.log('[REFRESH FLOW] Refresh failed', refreshError);
//         useAuthStore.getState().clearAccessToken();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
