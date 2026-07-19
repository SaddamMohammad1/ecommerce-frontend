import StorageHelper from "./storage.helper";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

class TokenHelper {
  setAccessToken(token: string) {
    StorageHelper.set(ACCESS_TOKEN, token);
  }

  getAccessToken() {
    return StorageHelper.get<string>(ACCESS_TOKEN);
  }

  removeAccessToken() {
    StorageHelper.remove(ACCESS_TOKEN);
  }

  setRefreshToken(token: string) {
    StorageHelper.set(REFRESH_TOKEN, token);
  }

  getRefreshToken() {
    return StorageHelper.get<string>(REFRESH_TOKEN);
  }

  removeRefreshToken() {
    StorageHelper.remove(REFRESH_TOKEN);
  }

  clearTokens() {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  saveTokens(access: string, refresh: string) {
    this.setAccessToken(access);
    this.setRefreshToken(refresh);
  }
}

export default new TokenHelper();