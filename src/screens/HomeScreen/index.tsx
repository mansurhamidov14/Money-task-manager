import { For, Show, createMemo, onCleanup, onMount } from "solid-js";
import {
  AccountCard,
  LogOutButton,
  SectionTitle,
  ThemeToggleButton,
  VerticalScroll
} from "@app/components";
import { Message } from "@app/i18n";
import { accountsStore, transactionsStore } from "@app/stores";
import { LatestTransactions, TransactionListSkeleton } from "./components";
import { createSlider } from "solid-slider";

let sliderRef: HTMLDivElement;
export function HomeScreen() {
  const transactionsLoaded = createMemo(() => {
    return transactionsStore.transactions().status === "success";
  });
  
  const options = { duration: 1000 };
  const [slider, { current, moveTo, destroy }] = createSlider(options);

  const moveToPrimaryAccountSlide = () => {
    setTimeout(() => moveTo(accountsStore.accounts().data!.findIndex(a => a.primary)), 20);
  }

  const reBuildSlider = () => {
    destroy();
    setTimeout(() => slider(sliderRef), 10);
    moveToPrimaryAccountSlide();
  }

  onMount(() => {
    setTimeout(() => slider(sliderRef), 10);
    moveToPrimaryAccountSlide();
    window.addEventListener("accountdeleted", reBuildSlider);
  });

  onCleanup(() => {
    window.removeEventListener("accountdeleted", reBuildSlider);
  });

  return (
    <VerticalScroll hasBottomNavigation>
      <main class="p-3">
        <div class="flex justify-end gap-2">
          <ThemeToggleButton />
          <LogOutButton />
        </div>
        <div class="-mx-3 relative">
          <div ref={sliderRef}>
            <For each={accountsStore.accounts().data!}>
              {account => <AccountCard hasBackSide account={account} />}
            </For>
          </div>
          <Show when={accountsStore.accounts().data!.length > 1}>
            <div class="absolute w-full bottom-1 flex justify-center gap-2">
              <For each={accountsStore.accounts().data!}>
                {(_, index) => (
                  <button
                    type="button"
                    classList={{
                      "rounded-full w-3 h-3 cursor-pointer": true,
                      "bg-secondary-400 dark:bg-secondary-300": current() === index(),
                      "bg-secondary-400/40 dark:bg-secondary-300/40": current() !== index()
                    }}
                    onClick={() => moveTo(index())}
                  />
                )}
              </For>
            </div>
          </Show>
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
    </VerticalScroll>
  );
}
