import {
  ExpenseAmountCard,
  IncomeAmountCard,
  SectionTitle
} from "@app/components";
import { Message } from "@app/i18n/components";
import { transactions } from "@app/stores";
import { LatestTransactions, TransactionListSkeleton } from "./components";
import { Show, createMemo } from "solid-js";

export function HomeScreen() {
  const loadingTransactions = createMemo(() => {
    return transactions.transactionsStore().isLoading;
  })
  return (
    <main class="bg-secondary-50 py-3 px-5 overflow-y-scroll">
      <div class="flex flex-col items-center gap-3 py-5">
        <div class="font-bold text-3xl">
          $2,500.50
        </div>
        <div class="text-secondary-400 font-medium text-sm">
          <Message>HomeScreen.totalBalance</Message>
        </div>
      </div>
      <div class="flex gap-5 mb-6">
        <IncomeAmountCard amount={transactions.incomeForTheMonth} currencySign="$" loading={loadingTransactions} />
        <ExpenseAmountCard amount={transactions.expensesForTheMonth} currencySign="$" loading={loadingTransactions} />
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
