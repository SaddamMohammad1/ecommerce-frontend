import apiClient from "@/services/apiClient";

type RequestOptions = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: unknown;
  params?: Record<string, unknown>;
};

class ApiHelper {
  request({
    url,
    method,
    data,
    params,
  }: RequestOptions) {
    return apiClient({
      url,
      method,
      data,
      params,
    });
  }
}

export default new ApiHelper();