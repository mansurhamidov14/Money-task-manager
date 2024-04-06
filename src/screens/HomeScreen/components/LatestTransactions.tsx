import { Show, createMemo } from "solid-js";
import { ImFilesEmpty } from "solid-icons/im";
import {
  EmptyList,
  List,
  SectionTitle,
  TransactionGroup,
  TransactionListItem
} from "@app/components";
import { useTransactions, groupTransactionsByDate } from "@app/hooks";
import { Await } from "@app/stores";
import { Message } from "@app/i18n";
import { useDateProcessor } from "@app/providers";
import { TransactionListSkeleton } from "./TransactionListSkeleton";

export function LatestTransactions() {
  const dateProcessor = useDateProcessor();
  const { transactions } = useTransactions({ limit: 5 });
  const latestTransactions = createMemo(() => {
    const list = transactions().data;
    if (!list) {
      return {};
    }
    return groupTransactionsByDate(list);
  })

  return (
    <>
      <SectionTitle>
        <Message>HomeScreen.recentTransactions</Message>  
      </SectionTitle>
      <Await for={[transactions()]} fallback={<TransactionListSkeleton />}>
        <div class="mb-4">
          <Show
            when={transactions().data?.[0]}
            fallback={(
              <EmptyList icon={<ImFilesEmpty />}>
                <Message count={10}>
                  HomeScreen.noRecentTransactions
                </Message>
              </EmptyList>
            )}
          >
            <List>
              {Object.entries(latestTransactions()).map(([date, transactions]) => (
                <TransactionGroup date={dateProcessor.humanize(new Date(date))}>
                  {transactions.map(transaction => (
                    <TransactionListItem {...transaction} />
                  ))}
                </TransactionGroup>
              ))}
            </List>
          </Show>
        </div>
      </Await>
    </>
  );
}
