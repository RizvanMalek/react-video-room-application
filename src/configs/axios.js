import axios from "axios";

const TOKEN = import.meta.env.VITE_VIDEOSDK_TOKEN;

const AxiosInstance = axios.create({
    baseURL: "https://api.videosdk.live/v2",
    headers: {
        Authorization: TOKEN,
        "Content-Type": "application/json",
    },
});

AxiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);


const BackendAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000", // Your backend server
    headers: {
        "Content-Type": "application/json",
    },
});

BackendAxios.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

BackendAxios.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export {
    BackendAxios
}
export default AxiosInstance;
