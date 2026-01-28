import axios from "axios";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN,
  withCredentials: true,
});

export default axiosSecure;
