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

  writeToSection<S extends keyof CachedData, D extends CachedData[S]>(section: S, data: D) {
    this.data[section] = data;
    this.write(this.data);
  }

  getCacheData<K extends keyof CachedData>(key: K, defaultValue: CachedData[K]): CachedData[K] {
    return this.data[key] ?? defaultValue;
  }
}

export const cacheService = new CacheService();
