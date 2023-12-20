import { Show } from "solid-js";
import { ImFilesEmpty } from "solid-icons/im";
import {
  EmptyList,
  TransactionGroup,
  TransactionList,
  TransactionListItem
} from "@app/components";
import { groupTransactionsByDate, transactionsStore, user } from "@app/stores";
import { RECENT_TRANSACTIONS_MAX_DAYS } from "@app/stores/transactions/constants";
import { Message, t } from "@app/i18n";
import { DateFormatter } from "@app/helpers";

export function LatestTransactions() {
  const dateFormatter = new DateFormatter(t);
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
      <TransactionList>
        {groupTransactionsByDate(transactionsStore.latestTransactions()!).map(group => (
          <TransactionGroup
            date={dateFormatter.humanize(group.date)}
            amount={group.amount}
            currency={user.currentUser().data!.primaryCurrency}
          >
            {group.transactions.map(transaction => (
              <TransactionListItem {...transaction} />
            ))}
          </TransactionGroup>
        ))}
      </TransactionList>
    </Show>
    
  );
}