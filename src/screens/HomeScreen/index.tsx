import { For, Show, createMemo, onMount } from "solid-js";
import {
  AccountCard,
  LogOutButton,
  SectionTitle,
  ThemeToggleButton
} from "@app/components";
import { Message } from "@app/i18n";
import { accountsStore, transactionsStore } from "@app/stores";
import { LatestTransactions, TransactionListSkeleton } from "./components";
import { skins } from "@app/constants";
import { createSlider } from "solid-slider";

let sliderRef: HTMLDivElement;
export function HomeScreen() {
  const transactionsLoaded = createMemo(() => {
    return transactionsStore.transactions().status === "success";
  });

  
  const options = { duration: 1000 };
  const [slider, { current, moveTo }] = createSlider(options);
  onMount(() => {
    slider(sliderRef);
    setTimeout(() => moveTo(1), 0);
  });

  return (
    <main class="p-3 overflow-y-auto">
      <div class="flex justify-end gap-2">
        <ThemeToggleButton />
        <LogOutButton />
      </div>
      <div class="-mx-3">
        <div ref={sliderRef}>
          <For each={accountsStore.accounts().data!}>
            {account => <AccountCard account={account} />}
          </For>
        </div>
        <div class="flex justify-center gap-2">
          <For each={accountsStore.accounts().data!}>
            {(_, index) => (
              <button
                type="button"
                classList={{
                  "rounded-full w-3 h-3 cursor-pointer": true,
                  "bg-secondary-300": current() === index(),
                  "bg-secondary-300/40": current() !== index()
                }}
                onClick={() => moveTo(index())}
              />
            )}
          </For>
          
        </div>
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
