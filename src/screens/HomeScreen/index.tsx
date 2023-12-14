import {
  ExpenseAmountCard,
  IncomeAmountCard,
  SectionTitle
} from "@app/components";
import { Message } from "@app/i18n/components";
import { transactions, user } from "@app/stores";
import { LatestTransactions, TransactionListSkeleton } from "./components";
import { Show, createMemo } from "solid-js";
import { CurrencyCode } from "@app/constants";

export function HomeScreen() {
  const loadingTransactions = createMemo(() => {
    return transactions.transactionsStore().isLoading;
  })
  return (
    <main class="bg-secondary-50 p-3 overflow-y-scroll">
      <div class="flex flex-col items-center gap-1 py-5">
        <div class="font-bold text-3xl">
          $2,500.50
        </div>
        <div class="text-secondary-400 font-medium text-sm">
          <Message>HomeScreen.totalBalance</Message>
        </div>
      </div>
      <div class="flex gap-5 mb-6 mt-4">
        <IncomeAmountCard
          amount={transactions.incomeForTheMonth}
          currency={user.currentUser().data!.currency ?? CurrencyCode.USD}
          loading={loadingTransactions}
        />
        <ExpenseAmountCard
          amount={transactions.expensesForTheMonth}
          currency={user.currentUser().data!.currency ?? CurrencyCode.USD}
          loading={loadingTransactions}
        />
      </div>
      <SectionTitle>
        <Message>HomeScreen.recentTransactions</Message>  
      </SectionTitle>
      <Show
        when={!transactions.transactionsStore().isLoading}
        fallback={<TransactionListSkeleton />}
      >
        <LatestTransactions />
      </Show>
    </main>
  );
}
