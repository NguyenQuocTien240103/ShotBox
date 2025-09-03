import axios from "axios";
const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const post = async (path, value = {}) => {
  const res = await request.post(path, value);
  return res.data;
};

export const put = async (path, value = {}) => {
  const res = await request.put(path, value);
  return res.data;
};

export const get = async (path, value = {}) => {
  const res = await request.get(path, value);
  return res.data;
};

export const deleteRequest = async (path) => {
  const res = await request.delete(path);
  return res.data;
};

export default request;
