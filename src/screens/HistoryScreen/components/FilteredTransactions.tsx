import {  Accessor, For, Show, createMemo } from "solid-js";
import { EmptyList, List, TransactionGroup, TransactionListItem } from "@app/components";
import { Transaction } from "@app/entities";
import { AsyncData, groupTransactionsByDate, sumAmountByCurrency } from "@app/hooks";
import { FaSolidFilterCircleXmark } from "solid-icons/fa";
import { Message } from "@app/i18n";
import { useDateProcessor } from "@app/providers";

type FilteredTransactionsProps = {
  transactions: Accessor<AsyncData<Transaction[]>>;
  onDelete: (id: Transaction['id']) => void;
}

export function FilteredTransactions(props: FilteredTransactionsProps) {
  const dateProcessor = useDateProcessor();
  const filteredTransactions = createMemo(() => (
    Object.entries(groupTransactionsByDate(
      props.transactions().data!
    ))
  ));

  return (
    <Show
      when={props.transactions().data!.length}
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
