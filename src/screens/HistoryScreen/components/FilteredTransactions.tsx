import { Accessor, For, Show, createMemo } from "solid-js";
import { EmptyList, List, TransactionGroup, TransactionListItem } from "@app/components";
import { CategoryId } from "@app/constants";
import { groupTransactionsByDate, sumAmountByCurrency, transactionsStore } from "@app/stores";
import { DateFilter } from "../types";
import { FaSolidFilterCircleXmark } from "solid-icons/fa";
import { Message } from "@app/i18n";
import { useDateFormatter } from "@app/providers";

type FilteredTransactionsProps = {
  categoryFilter: Accessor<CategoryId | null>;
  dateFilter: Accessor<DateFilter>
}

export function FilteredTransactions({ categoryFilter, dateFilter }: FilteredTransactionsProps) {
  const dateFormatter = useDateFormatter();
  const filteredTransactions = createMemo(() => (
    Object.entries(groupTransactionsByDate(
      transactionsStore.getFilteredTransactions(categoryFilter(), dateFilter())
    ))
  ));

  return (
    <Show
      when={filteredTransactions()[0]}
      fallback={(
        <EmptyList icon={<FaSolidFilterCircleXmark />}>
          <Message>HistoryScreen.noTransactionForTheFilter</Message>
        </EmptyList>
      )}
    >
      <List>
        <For each={filteredTransactions()}>
          {([date, transactions]) => {
            const amountsByCurrencies = sumAmountByCurrency(transactions);
            return (
              <TransactionGroup
                date={dateFormatter.humanize(new Date(date))}
                amounts={amountsByCurrencies}
              >
                <For each={transactions}>
                  {transaction => <TransactionListItem {...transaction} />}
                </For>
              </TransactionGroup>
            );
          }}
        </For>
      </List>
    </Show>
  );
}
