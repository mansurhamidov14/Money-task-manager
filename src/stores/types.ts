export type AsyncStore<T> = {
  status: AsyncStoreStatus;
  error?: string;
  data?: T
}

export type AsyncStoreStatus = "loading" | "success" | "error";
