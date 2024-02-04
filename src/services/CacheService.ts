import { initialCacheData } from "./consts";
import { CachedData } from "./types";

class CacheService {
  data: CachedData;
  private localStorageAccessKey = "wfoAppCache";

  constructor() {
    const cached = localStorage.getItem(this.localStorageAccessKey);
    this.data = (cached ? JSON.parse(cached) : initialCacheData) as CachedData;
  }

  clear() {
    this.write(initialCacheData);
  }

  write(data: CachedData) {
    this.data = data;
    localStorage.setItem(this.localStorageAccessKey, JSON.stringify(data))
  }
}

export const cacheService = new CacheService();
