import { TransactionGroupSkeleton, TransactionList, TransactionListItemSkeleton } from "@app/components";

export function TransactionListSkeleton() {
  return (
    <TransactionList>
      <TransactionGroupSkeleton>
        <TransactionListItemSkeleton />
        <TransactionListItemSkeleton amountColor="bg-teal-200 dark:bg-teal-400/30" />
      </TransactionGroupSkeleton>
      <TransactionGroupSkeleton>
        <TransactionListItemSkeleton />
        <TransactionListItemSkeleton />
        <TransactionListItemSkeleton amountColor="bg-teal-200 dark:bg-teal-400/30" />
      </TransactionGroupSkeleton>
    </TransactionList>
  );
}
