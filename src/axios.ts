import ax from "axios";
import { getSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";

const axios = ax.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axios.interceptors.request.use(
  async (config) => {
    const session: any = await getSession();
    const token = session?.user?.data?.tokens;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // console.error(
      //   error?.response?.data?.message ||
      //     "Session expired, redirecting to signin..."
      // );
      // toast.error(
      //   error?.response?.data?.message ||
      //     "Session expired, redirecting to signin..."
      // );
      // signOut();
      return error?.response?.data?.message;
    } else {
      return error.response.data;
    }
  }
);

export default axios;
