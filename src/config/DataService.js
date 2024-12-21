import axios from "axios";
export var baseUrl = process.env.REACT_APP_BASE_URL;

// export var baseUrl = "http://localhost:3032/api/";

const DataService = axios.create({
  baseURL: baseUrl,
});

DataService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.auth = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default DataService;
