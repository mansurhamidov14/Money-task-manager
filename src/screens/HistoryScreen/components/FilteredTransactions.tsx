import { Accessor, For, Show, createMemo } from "solid-js";
import { EmptyList, TransactionGroup, TransactionList, TransactionListItem } from "@app/components";
import { CategoryId, CurrencyCode } from "@app/constants";
import { groupTransactionsByDate, transactionsStore, user } from "@app/stores";
import { DateFilter } from "../types";
import { FaSolidFilterCircleXmark } from "solid-icons/fa";
import { Message } from "@app/i18n/components";
import { DateFormatter } from "@app/helpers";
import { t } from "@app/i18n";

type FilteredTransactionsProps = {
  categoryFilter: Accessor<CategoryId | null>;
  dateFilter: Accessor<DateFilter>
}

export function FilteredTransactions({ categoryFilter, dateFilter }: FilteredTransactionsProps) {
  const filteredTransactions = createMemo(() => {
    return groupTransactionsByDate(
      transactionsStore.getFilteredTransactions(categoryFilter(), dateFilter()),
      true
    );
  });

  const dateFormatter = new DateFormatter(t);

  return (
    <Show
      when={filteredTransactions()[0]}
      fallback={(
        <EmptyList icon={<FaSolidFilterCircleXmark />}>
          <Message>HistoryScreen.noTransactionForTheFilter</Message>
        </EmptyList>
      )}
    >
      <TransactionList>
        <For each={filteredTransactions()}>
          {group => (
            <TransactionGroup
              date={dateFormatter.humanize(group.date)}
              amount={group.amount}
              currency={user.currentUser().data!.primaryCurrency || CurrencyCode.USD}
            >
              <For each={group.transactions}>
                {transaction => <TransactionListItem {...transaction} />}
              </For>
            </TransactionGroup>
          )}
        </For>
      </TransactionList>
    </Show>
  );
}
