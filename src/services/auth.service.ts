import ApiHelper from "@/helpers/api.helper";

import { LoginPayload } from "@/store/auth";

class AuthService {
  login(data: LoginPayload) {
    return ApiHelper.request({
      url: "/accounts/login/",
      method: "POST",
      data,
    });
  }
}

export default new AuthService();