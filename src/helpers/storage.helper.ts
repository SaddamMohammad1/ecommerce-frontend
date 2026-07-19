class StorageHelper {
  set(key: string, value: unknown) {
    if (typeof window === "undefined") return;

    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;

    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  }

  remove(key: string) {
    if (typeof window === "undefined") return;

    localStorage.removeItem(key);
  }

  clear() {
    if (typeof window === "undefined") return;

    localStorage.clear();
  }
}

export default new StorageHelper();