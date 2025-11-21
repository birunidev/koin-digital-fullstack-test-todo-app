import Axios from "axios";
import { type AxiosRequestConfig } from "axios";
import { toast } from "sonner";

export const AXIOS_INSTANCE = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1",
});

const ignoredPaths = ["/auth/login", "/auth/register"];

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token") || "null") as string;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !ignoredPaths.includes(window.location.pathname)
    ) {
      if (window.location.pathname.includes("/protected")) {
        toast.error("Unauthenticated");
        window.location.href = "/auth/login";
      }
      return Promise.reject(error);
    }

    if (error.response?.status === 429) {
      toast.error("Too many requests");
      return Promise.reject(error);
    }

    if (error.response?.status === 409) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

interface AdditionalAxiosRequestConfig extends AxiosRequestConfig {
  disableNotifyError?: boolean;
}

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AdditionalAxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  })
    .then((response) => {
      const data = response?.data;

      return data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};
