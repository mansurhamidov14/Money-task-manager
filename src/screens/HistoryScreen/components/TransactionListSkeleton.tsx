import { TransactionGroupSkeleton, TransactionList, TransactionListItemSkeleton } from "@app/components";

export function TransactionListSkeleton() {
  return (
    <TransactionList>
      <TransactionGroupSkeleton>
        <TransactionListItemSkeleton />
        <TransactionListItemSkeleton />
      </TransactionGroupSkeleton>
      <TransactionGroupSkeleton>
        <TransactionListItemSkeleton />
        <TransactionListItemSkeleton />
        <TransactionListItemSkeleton />
      </TransactionGroupSkeleton>
    </TransactionList>
  );
}
