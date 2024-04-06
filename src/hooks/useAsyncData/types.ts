export type AsyncDataStatus = "loading" | "success" | "error";
export type AsyncData<T> = {
  status: AsyncDataStatus;
  error?: string;
  data?: T
}
