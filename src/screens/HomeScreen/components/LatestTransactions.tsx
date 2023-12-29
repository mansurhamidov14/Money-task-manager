import { Show, createMemo } from "solid-js";
import { ImFilesEmpty } from "solid-icons/im";
import {
  EmptyList,
  List,
  TransactionGroup,
  TransactionListItem
} from "@app/components";
import { groupTransactionsByDate, transactionsStore } from "@app/stores";
import { RECENT_TRANSACTIONS_MAX_DAYS } from "@app/stores/transactions/constants";
import { Message } from "@app/i18n";
import { useDateFormatter } from "@app/providers";

export function LatestTransactions() {
  const dateFormatter = useDateFormatter();
  const latestTransactions = createMemo(() => (
    Object.entries(groupTransactionsByDate(transactionsStore.latestTransactions()!))
  ));

  return (
    <Show
      when={transactionsStore.latestTransactions()?.[0]}
      fallback={(
        <EmptyList icon={<ImFilesEmpty />}>
          <Message count={RECENT_TRANSACTIONS_MAX_DAYS}>
            HomeScreen.noRecentTransactions
          </Message>
        </EmptyList>
      )}
    >
      <List>
        {latestTransactions().map(([date, transactions]) => (
          <TransactionGroup date={dateFormatter.humanize(new Date(date))}>
            {transactions.map(transaction => (
              <TransactionListItem {...transaction} />
            ))}
          </TransactionGroup>
        ))}
      </List>
    </Show>
  );
}