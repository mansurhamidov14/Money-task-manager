import { Show, createMemo } from "solid-js";
import {
  AccountCard,
  LogOutButton,
  SectionTitle,
  ThemeToggleButton
} from "@app/components";
import { Message } from "@app/i18n";
import { transactionsStore } from "@app/stores";
import { LatestTransactions, TransactionListSkeleton } from "./components";
import { skins } from "@app/constants";

export function HomeScreen() {
  const transactionsLoaded = createMemo(() => {
    return transactionsStore.transactions().status === "success";
  });

  return (
    <main class="p-3 overflow-y-auto">
      <div class="flex justify-end gap-2">
        <ThemeToggleButton />
        <LogOutButton />
      </div>
      <div class="px-4">
        <AccountCard skin={skins[3]} />
      </div>
      <SectionTitle>
        <Message>HomeScreen.recentTransactions</Message>  
      </SectionTitle>
      <Show
        when={transactionsLoaded()}
        fallback={<TransactionListSkeleton />}
      >
        <LatestTransactions />
      </Show>
    </main>
  );
}
