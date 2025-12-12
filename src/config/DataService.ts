import axios from "axios";
import { toast } from "sonner";
import type { NavigateFunction } from "react-router-dom";
import type { AppDispatch } from "../redux/store";
import { logout } from "../redux/features/auth/authSlice";

const API_ENDPOINT = import.meta.env.VITE_BASE_URL;

// Create Axios instance
const DataService = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Authorization: localStorage.getItem("auth")
      ? `Bearer ${localStorage.getItem("auth")}`
      : "",
  },
});

// Call this once with navigate reference
export const setupInterceptors = (
  navigate: NavigateFunction,
  dispatch: AppDispatch
) => {
  DataService.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("auth");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  DataService.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.data?.status === 401) {
        toast.error(error?.response?.data?.message);
        dispatch(logout());
        navigate("/admin/login");
      }
      return Promise.reject(error);
    }
  );
};

// Common options
interface HandlerOptionsItem {
  showToast?: boolean;
  query?: Record<string, unknown>;
}

const defaultOptions: HandlerOptionsItem = {
  showToast: false,
  query: {},
};

const defaultPostOptions: HandlerOptionsItem = {
  showToast: true,
  query: {},
};
interface ApiResponse<T> {
  status: 200 | 201 | 400 | 401 | 403 | 404 | 500;
  message?: string;
  data: T;
}

const handleError = (error: unknown, showToast?: boolean) => {
  let message = "Something went wrong!";
  if (axios.isAxiosError(error)) {
    if(error?.response?.data?.status === 401){
      return;
    }
    message = error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  console.error("API Error:", message);

  if (showToast) {
    toast.error(message);
  }
};

// #region GET
export const getApiHandler = async <T>(
  url: string,
  options: HandlerOptionsItem = defaultOptions
): Promise<ApiResponse<T> | undefined> => {
  try {
    const response = await DataService.get<ApiResponse<T>>(url, {
      params: options.query,
    });

    if (options.showToast && response.data.message) {
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error) {
    handleError(error, options.showToast);
  }
};

// #region POST
export const postApiHandler = async <T>(
  url: string,
  values: unknown,
  options: HandlerOptionsItem = defaultPostOptions
): Promise<ApiResponse<T> | undefined> => {
  try {
    const response = await DataService.post<ApiResponse<T>>(url, values, {
      params: options.query,
    });

    if (options.showToast && response.data.message) {
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error) {
    handleError(error, options.showToast);
    return axios.isAxiosError(error) ? error.response?.data : undefined;
  }
};

// #region PUT
export const putApiHandler = async <T>(
  url: string,
  values: unknown,
  options: HandlerOptionsItem = defaultPostOptions
): Promise<ApiResponse<T> | undefined> => {
  try {
    const response = await DataService.put<ApiResponse<T>>(url, values, {
      params: options.query,
    });

    if (options.showToast && response.data.message) {
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error) {
    handleError(error, options.showToast);
    return axios.isAxiosError(error) ? error.response?.data : undefined;
  }
};

// #region DELETE
export const deleteApiHandler = async <T>(
  url: string,
  options: HandlerOptionsItem = defaultPostOptions
): Promise<ApiResponse<T> | undefined> => {
  try {
    const response = await DataService.delete<ApiResponse<T>>(url, {
      params: options.query,
    });

    if (options.showToast && response.data.message) {
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error) {
    handleError(error, options.showToast);
  }
};

export default DataService;
