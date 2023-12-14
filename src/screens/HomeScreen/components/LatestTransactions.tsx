import { Show } from "solid-js";
import {
  EmptyList,
  TransactionGroup,
  TransactionList,
  TransactionListItem
} from "@app/components";
import { groupTransactionsByDate, transactions, user } from "@app/stores";
import { ImFilesEmpty } from "solid-icons/im";
import { RECENT_TRANSACTIONS_MAX_DAYS } from "@app/stores/transactions/constants";
import { Message } from "@app/i18n/components";
import { CurrencyCode } from "@app/constants";

export function LatestTransactions() {
  return (
    <Show
      when={transactions.latestTransactions()?.[0]}
      fallback={(
        <EmptyList icon={<ImFilesEmpty />}>
          <Message count={RECENT_TRANSACTIONS_MAX_DAYS}>
            HomeScreen.noRecentTransactions
          </Message>
        </EmptyList>
      )}
    >
      <TransactionList>
        {groupTransactionsByDate(transactions.latestTransactions()!).map(group => (
          <TransactionGroup
            date={group.date}
            amount={() => group.amount}
            currency={user.currentUser().data!.currency ?? CurrencyCode.USD}
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