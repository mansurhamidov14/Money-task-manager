import { Show, createMemo } from "solid-js";
import {
  AmountCard,
  LogOutButton,
  SectionTitle,
  ThemeToggleButton
} from "@app/components";
import { Message } from "@app/i18n";
import { ProtectedPage, transactionsStore, user } from "@app/stores";
import { LatestTransactions, TransactionListSkeleton } from "./components";

export function HomeScreen() {
  const loadingTransactions = createMemo(() => {
    return transactionsStore.transactions().isLoading;
  });

  return (
    <ProtectedPage>
      <main class="p-3 overflow-y-auto">
        <div class="flex justify-end gap-2">
          <ThemeToggleButton />
          <LogOutButton />
        </div>
        <div class="flex flex-col items-center gap-1 py-5">
          <div class="font-bold text-3xl">
            $2,500.50
          </div>
          <div class="text-secondary-400 dark:text-secondary-300 font-medium text-sm">
            <Message>HomeScreen.totalBalance</Message>
          </div>
        </div>
        <div class="flex gap-5 mb-6 mt-4">
          <AmountCard
            amount={transactionsStore.incomeForTheMonth()}
            currency={user.currentUser().data!.primaryCurrency}
            loading={loadingTransactions()}
            type="income"
          />
          <AmountCard
            amount={transactionsStore.expensesForTheMonth()}
            currency={user.currentUser().data!.primaryCurrency}
            loading={loadingTransactions()}
            type="expense"
          />
        </div>
        <SectionTitle>
          <Message>HomeScreen.recentTransactions</Message>  
        </SectionTitle>
        <Show
          when={!transactionsStore.transactions().isLoading}
          fallback={<TransactionListSkeleton />}
        >
          <LatestTransactions />
        </Show>
      </main>
      </ProtectedPage>
  );
}
