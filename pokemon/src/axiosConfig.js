import axios from "axios";

export const axiosConfig = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  axios.interceptors.request.use((config) => {
    config.baseURL = "http://localhost:5000/v3";
    config.headers.Authorization = user?.token ? `Bearer ${user?.token}` : "";

    return config;
  });
};
