import { AccountCard } from "@app/components";
import { Account } from "@app/stores";
import { For, Show, onCleanup, onMount } from "solid-js";
import { createSlider } from "solid-slider";

export function AccountsSlider(props: { accounts: Account[] }) {
  let sliderRef: HTMLDivElement | undefined = undefined;
  const [slider, { current, moveTo, destroy }] = createSlider({
    slides: { origin: "center" },
    initial: props.accounts.findIndex(a => a.primary),
    breakpoints: {
      "(min-width: 768px)": {
        slides: { origin: "center", perView: props.accounts.length > 1 ? 2 : 1 }
      }
    }
  });

  onMount(async () => {
    slider(sliderRef!);
  });

  onCleanup(() => {
    destroy();
  });

  return (
    <div class="-mx-3 md:-mx-9 lg:-mx-14 relative">
      <div ref={sliderRef}>
        <For each={props.accounts}>
          {account => <AccountCard hasBackSide account={account} />}
        </For>
      </div>
      <Show when={props.accounts.length > 1}>
        <div class="absolute w-full bottom-1 flex justify-center gap-2">
          <For each={props.accounts}>
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
  );
}
