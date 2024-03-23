export type StorageItemOptions<T> = {
  accessor: string;
  initialValue: T extends any ? (T | (() => T)) : never;
  storage?: Storage;
}

export class StorageItem<T extends any> {
  private initialValue: T extends any ? (T | (() => T)) : never;
  private currentValue: T;
  private storage: Storage;
  private accessor: string;

  constructor(options: StorageItemOptions<T>) {
    this.storage = options.storage ?? window.localStorage;
    this.initialValue = options.initialValue;
    const storageItem = this.storage.getItem(options.accessor);
    this.currentValue = storageItem ? JSON.parse(storageItem)
      : typeof this.initialValue !== 'function'
        ? this.initialValue
        : this.initialValue();
    this.accessor = options.accessor;
  }

  get value() {
    return this.currentValue;
  }

  set value(value: T) {
    this.currentValue = value;
    this.storage.setItem(this.accessor, JSON.stringify(this.currentValue));
    const event = new CustomEvent(this.changeEventName, { detail: value })
    window.dispatchEvent(event);
  }

  clear() {
    this.currentValue = typeof this.initialValue !== 'function' ? this.initialValue : this.initialValue();
    this.storage.removeItem(this.accessor);
  }

  onChange(callback: (value: T) => void) {
    window.addEventListener(this.changeEventName, (event: CustomEventInit<T>) => {
      callback(event.detail as T)
    });
  }

  private get changeEventName() {
    return `storageItemChange${this.accessor}`;
  }
}