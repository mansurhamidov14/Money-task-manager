export type AsyncDataStatus = "initial" | "loading" | "success" | "error";
export type AsyncData<T = unknown> = {
  status: AsyncDataStatus;
  error?: string;
  data?: T
}
