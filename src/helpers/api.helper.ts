import apiClient from "@/services/apiClient";

export type ApiFieldErrors = Record<string, string>;

function getAxiosResponseData(error: unknown): unknown {
  if (!error || typeof error !== "object") {
    return null;
  }

  const axiosError = error as {
    response?: { data?: unknown };
  };

  return axiosError.response?.data ?? null;
}

function formatFieldError(value: unknown): string | null {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value.map(String).join(" ");
  }

  return null;
}

export function getApiFieldErrors(error: unknown): ApiFieldErrors {
  const data = getAxiosResponseData(error);

  if (!data || typeof data !== "object") {
    return {};
  }

  const record = data as Record<string, unknown>;
  const fieldErrors: ApiFieldErrors = {};

  for (const [key, value] of Object.entries(record)) {
    if (key === "detail" || key === "message") {
      continue;
    }

    const message = formatFieldError(value);

    if (message) {
      fieldErrors[key] = message;
    }
  }

  return fieldErrors;
}

export function getApiErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== "object") {
    return null;
  }

  const axiosError = error as {
    message?: string;
  };

  const data = getAxiosResponseData(error);

  if (!data) {
    return axiosError.message ?? null;
  }

  if (typeof data === "string") {
    return data;
  }

  if (typeof data === "object" && data !== null) {
    const record = data as Record<string, unknown>;

    if (typeof record.detail === "string") {
      return record.detail;
    }

    if (Array.isArray(record.detail)) {
      return record.detail.map(String).join(" ");
    }

    if (typeof record.message === "string") {
      return record.message;
    }
  }

  return null;
}

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