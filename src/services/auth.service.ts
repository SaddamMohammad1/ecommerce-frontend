import ApiHelper from "@/helpers/api.helper";

import {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/store/auth/auth.types";

class AuthService {
  login(data: LoginPayload) {
    return ApiHelper.request({
      url: "/accounts/login/",
      method: "POST",
      data,
    });
  }

  register(data: RegisterPayload) {
    return ApiHelper.request({
      url: "/accounts/register/",
      method: "POST",
      data,
    });
  }

  getProfile() {
    return ApiHelper.request({
      url: "/accounts/me/",
      method: "GET",
    });
  }

  forgotPassword(data: ForgotPasswordPayload) {
    return ApiHelper.request({
      url: "/accounts/forgot-password/",
      method: "POST",
      data,
    });
  }

  resetPassword(data: ResetPasswordPayload) {
    return ApiHelper.request({
      url: "/accounts/reset-password/",
      method: "POST",
      data,
    });
  }
}

export default new AuthService();
