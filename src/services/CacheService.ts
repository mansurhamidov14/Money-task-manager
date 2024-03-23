
import { StorageItem } from "@app/entities";
import { getInitialCacheData } from "./consts";
import { CachedData } from "./types";

export class CacheService {
  private storageItem: StorageItem<CachedData>;

  constructor() {
    this.storageItem = new StorageItem({
      accessor: "wfoAppCache",
      initialValue: getInitialCacheData
    });
  }

  get data() {
    return this.storageItem.value;
  }

  clear() {
    this.storageItem.clear();
  }

  write(data: CachedData) {
    this.storageItem.value = data;
  }

  writeToSection<S extends keyof CachedData, D extends CachedData[S]>(section: S, data: D) {
    const value = this.data;
    value[section] = data;
    this.write(value);
  }

  getCacheData<K extends keyof CachedData>(key: K): CachedData[K] {
    return this.data[key];
  }
}
