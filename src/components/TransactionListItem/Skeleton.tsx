export function TransactionListItemSkeleton() {
  return (
    <div class="bg-white shadow rounded-lg pl-3 pr-6 py-4">
      <div class="flex justify-between gap-3 animate-pulse">
        <div
          class="rounded-lg bg-gray-400 flex justify-center items-center aspect-square h-12 text-3xl"
        />
        <div class="flex-1">
          <div class="bg-gray-300 h-[16px] w-[120px] mt-1 rounded-md" />
          <div class="bg-gray-200 h-[12px] w-[80px] mt-3 rounded-md" />
        </div>
        <div class="flex flex-col items-end">
          <div class="w-[45px] h-[16px] bg-gray-300 rounded-md mt-1" />
          <div class="bg-gray-200 h-[12px] w-[32px] rounded-md mt-3" />
        </div>
      </div>
    </div>
  );
}