import { EmptyList, List, TransactionGroup, TransactionListItem } from "@app/components";
import { Transaction } from "@app/entities";
import { groupTransactionsByDate, sumAmountByCurrency } from "@app/hooks";
import { Message } from "@app/i18n";
import { useDateProcessor } from "@app/providers";
import { FaSolidFilterCircleXmark } from "solid-icons/fa";
import { Accessor, For, Show, createMemo } from "solid-js";

type FilteredTransactionsProps = {
  transactions: Accessor<Transaction[]>;
  onDelete: (id: Transaction['id']) => void;
}

export function FilteredTransactions(props: FilteredTransactionsProps) {
  const dateProcessor = useDateProcessor();
  const dateGroups = createMemo(() => (
    Object.entries(groupTransactionsByDate(
      props.transactions()
    ))
  ));

  return (
    <Show
      when={dateGroups().length}
      fallback={(
        <EmptyList icon={<FaSolidFilterCircleXmark />}>
          <Message>HistoryScreen.noTransactionForTheFilter</Message>
        </EmptyList>
      )}
    >
      <List>
        <For each={dateGroups()}>
          {([date, transactions]) => {
            const amountsByCurrencies = sumAmountByCurrency(transactions);
            return (
              <TransactionGroup
                date={dateProcessor.humanize(new Date(date))}
                amounts={amountsByCurrencies}
              >
                <For each={transactions}>
                  {transaction => <TransactionListItem transaction={transaction} onDelete={props.onDelete} />}
                </For>
              </TransactionGroup>
            );
          }}
        </For>
      </List>
    </Show>
  );
}
