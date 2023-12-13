export type AsyncStore<T> = {
  isLoading: boolean;
  hasError: boolean;
  error?: string;
  data?: T
}
