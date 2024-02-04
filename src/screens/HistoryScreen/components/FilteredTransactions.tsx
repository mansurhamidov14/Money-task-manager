import { Accessor, For, Show, createMemo } from "solid-js";
import { EmptyList, List, TransactionGroup, TransactionListItem } from "@app/components";
import { Transaction, groupTransactionsByDate, sumAmountByCurrency } from "@app/stores";
import { FaSolidFilterCircleXmark } from "solid-icons/fa";
import { Message } from "@app/i18n";
import { useDateProcessor } from "@app/providers";

type FilteredTransactionsProps = {
  transactions: Accessor<Transaction[]>;
}

export function FilteredTransactions(props: FilteredTransactionsProps) {
  const dateProcessor = useDateProcessor();
  const filteredTransactions = createMemo(() => (
    Object.entries(groupTransactionsByDate(
      props.transactions()
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
                date={dateProcessor.humanize(new Date(date))}
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
