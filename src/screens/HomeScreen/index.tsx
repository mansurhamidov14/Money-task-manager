import { For, Show, createMemo, onCleanup, onMount } from "solid-js";
import {
  AccountCard,
  Loading,
  SectionTitle,
  ThemeToggleButton,
  VerticalScroll
} from "@app/components";
import { Message } from "@app/i18n";
import { accountsStore, transactionsStore, user } from "@app/stores";
import { LatestTransactions, TransactionListSkeleton } from "./components";
import { createSlider } from "solid-slider";

let sliderRef: HTMLDivElement;
export function HomeScreen() {
  const currentUser = user.currentUser().data!;
  const transactionsLoaded = createMemo(() => {
    return transactionsStore.transactions().status === "success";
  });
  
  const options = { duration: 1000 };
  const [slider, { current, moveTo, destroy }] = createSlider(options);

  const moveToPrimaryAccountSlide = () => {
    if (accountsStore.accounts().status === "success") {
      setTimeout(() => moveTo(
        accountsStore.accounts().data!.findIndex(a => a.primary)
      ), 20);
    }
  };

  const reBuildSlider = () => {
    destroy();
    slider(sliderRef);
    moveToPrimaryAccountSlide();
  };

  onMount(async () => {
    if (accountsStore.accounts().status === "success") {
      slider(sliderRef);
    }
    moveToPrimaryAccountSlide();
    window.addEventListener("accountsstoreupdated", reBuildSlider);
  });

  onCleanup(() => {
    window.removeEventListener("accountsstoreupdated", reBuildSlider);
    destroy();
  });

  return (
    <VerticalScroll hasBottomNavigation>
      <main class="p-3">
        <div class="flex justify-end items-start gap-2">
          <div class="flex-1 text-lg font-semibold flex gap-3 pt-2 items-center">
            <img class="w-12 h-12 rounded-full border-secondary-200 dark:border-gray-600 border-4" src={currentUser.avatar} />
            <Message name={currentUser.firstName}>HomeScreen.greeting</Message>
          </div>
          <ThemeToggleButton />
        </div>
        <div class="-mx-3 relative">
          <div ref={sliderRef}>
            <Show when={accountsStore.accounts().status === "success"} fallback={<Loading />}>
              <For each={accountsStore.accounts().data!}>
                {account => <AccountCard hasBackSide account={account} />}
              </For>
            </Show>
          </div>
          <Show when={accountsStore.accounts().status === "success" && accountsStore.accounts().data!.length > 1}>
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
