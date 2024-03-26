export type StorageEvent = "change";
export type StorageEventHandler<T> = (value: T) => void;