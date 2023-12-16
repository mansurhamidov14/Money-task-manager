import {
  TransactionGroupSkeleton,
  TransactionList,
  TransactionListItemSkeleton
} from "@app/components";

export function TransactionListSkeleton() {
  return (
    <TransactionList>
      <TransactionGroupSkeleton>
        <TransactionListItemSkeleton />
      </TransactionGroupSkeleton>
      <TransactionGroupSkeleton>
        <TransactionListItemSkeleton />
      </TransactionGroupSkeleton>
      <TransactionGroupSkeleton>
        <TransactionListItemSkeleton amountColor="bg-teal-200 dark:bg-teal-400/30" />
      </TransactionGroupSkeleton>
    </TransactionList>
  );
}
