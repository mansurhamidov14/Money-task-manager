import { INITIAL_CACHE_DATA } from "./consts";
import { CachedData } from "./types";

class CacheService {
  data: CachedData;
  private localStorageAccessKey = "wfoAppCache";

  constructor() {
    const cached = localStorage.getItem(this.localStorageAccessKey);
    this.data = (cached ? JSON.parse(cached) : INITIAL_CACHE_DATA) as CachedData;
  }

  clear() {
    this.write(INITIAL_CACHE_DATA);
  }

  write(data: CachedData) {
    this.data = data;
    localStorage.setItem(this.localStorageAccessKey, JSON.stringify(data))
  }
}

export const cacheService = new CacheService();
