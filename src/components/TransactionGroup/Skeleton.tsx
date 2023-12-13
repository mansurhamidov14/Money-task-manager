import { ParentProps } from "solid-js";

export function TransactionGroupSkeleton({ children }: ParentProps) {
  return (
    <div class="flex flex-col gap-3">
      <div class="bg-secondary-200 w-[60px] h-2.5 mt-1 animate-pulse rounded-md" />
      {children}
    </div>
  );
}