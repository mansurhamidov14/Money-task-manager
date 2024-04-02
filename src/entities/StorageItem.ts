import { DataWithEventHandlers } from ".";
import { StorageEvent, StorageEventHandler } from "./types";

export type StorageItemOptions<T> = {
  accessor: string;
  initialValue: T extends any ? (T | (() => T)) : never;
  storage?: Storage;
}

export class StorageItem<T extends any> extends DataWithEventHandlers<StorageEvent, StorageEventHandler<T>> {
  private initialValue: T extends any ? (T | (() => T)) : never;
  private currentValue: T;
  private storage: Storage;
  private accessor: string;

  constructor(options: StorageItemOptions<T>) {
    super(["change"]);
    this.storage = options.storage ?? window.localStorage;
    this.initialValue = options.initialValue;
    const storageItem = this.storage.getItem(options.accessor);
    this.currentValue = this.parseStorageValue(storageItem) ?? (
      typeof this.initialValue !== 'function'
        ? this.initialValue
        : this.initialValue()
    );
    this.accessor = options.accessor;
  }

  get value() {
    return this.currentValue;
  }

  set value(value: T) {
    this.currentValue = value;
    this.storage.setItem(this.accessor, JSON.stringify(this.currentValue));
    this.dispatchEvent("change", value);
  }

  clear() {
    this.currentValue = typeof this.initialValue !== 'function' ? this.initialValue : this.initialValue();
    this.storage.removeItem(this.accessor);
  }

  private parseStorageValue(value?: string | null) {
    if (!value) return value;

    try {
      const parsed = JSON.parse(value);
      return parsed;
    } catch {
      return value;
    }
  }
}