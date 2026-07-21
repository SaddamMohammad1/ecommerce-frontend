import type { AxiosInstance } from "axios";

import TokenHelper from "@/helpers/token.helper";

export function setupInterceptors(client: AxiosInstance) {
  client.interceptors.request.use(
    (config) => {
      const token = TokenHelper.getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  );
}
