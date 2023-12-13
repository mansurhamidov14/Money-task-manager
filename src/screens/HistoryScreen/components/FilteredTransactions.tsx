import { Accessor, For, createMemo } from "solid-js";
import { TransactionGroup, TransactionList, TransactionListItem } from "@app/components";
import { CategoryId } from "@app/constants";
import { groupTransactionsByDate, transactions } from "@app/stores";

type FilteredTransactionsProps = {
  activeCategoryFilter: Accessor<CategoryId | null>
}

export function FilteredTransactions({ activeCategoryFilter }: FilteredTransactionsProps) {
  const filteredTransactions = createMemo(() => {
    return groupTransactionsByDate(
      transactions.getFilteredTransactions(
        activeCategoryFilter()
      )
    );
  });

  return (
    <TransactionList>
      <For each={filteredTransactions()}>
        {group => (
          <TransactionGroup date={group.date}>
            <For each={group.transactions}>
              {transaction => <TransactionListItem {...transaction} />}
            </For>
          </TransactionGroup>
        )}
      </For>
    </TransactionList>
  );
}
