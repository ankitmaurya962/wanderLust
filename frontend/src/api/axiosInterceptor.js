import axios from "axios";
import toast from "react-hot-toast";

let isRedirecting = false;

axios.defaults.withCredentials = true; // keep this

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || "Something went wrong ❌";

    // 🔐 Auth error
    if (status === 401) {
      if (!isRedirecting) {
        isRedirecting = true;

        toast.error("Please login first 🔒");

        setTimeout(() => {
          window.location.href = "/signin";
        }, 1000);
      }
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);