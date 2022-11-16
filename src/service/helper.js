import axios from "axios";
import { getToken } from "../auth/UserDataAuth";

export const BASE_URL = "http://localhost:8091";

export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

//adding token to header of privateAxios
privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
  },
  (error) => Promise.reject(error)
);
