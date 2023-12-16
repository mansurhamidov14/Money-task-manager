type Props = {
  amountColor?: string;
}

export function TransactionListItemSkeleton({ amountColor = "bg-rose-200 dark:bg-rose-400/30" }: Props) {
  return (
    <div class="bg-white dark:bg-secondary-700 shadow rounded-lg pl-3 pr-6 py-4">
      <div class="flex justify-between gap-3 animate-pulse">
        <div
          class="rounded-lg bg-secondary-600 dark:bg-secondary-500 flex justify-center items-center aspect-square h-12 text-3xl"
        />
        <div class="flex-1">
          <div class="bg-secondary-300 dark:bg-secondary-500 h-[16px] w-[120px] mt-1 rounded-md" />
          <div class="bg-secondary-200 dark:bg-secondary-600 h-[12px] w-[80px] mt-3 rounded-md" />
        </div>
        <div class="flex flex-col items-end">
          <div class={`w-[45px] h-[16px] ${amountColor} rounded-md mt-1`} />
          <div class="bg-secondary-200 dark:bg-secondary-600 h-[12px] w-[32px] rounded-md mt-3" />
        </div>
      </div>
    </div>
  );
}