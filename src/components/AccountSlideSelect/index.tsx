import { Account } from "@app/stores";
import { useSearchParams } from "@solidjs/router";
import { For, JSX, Show, onCleanup, onMount, splitProps } from "solid-js";
import { createSlider } from "solid-slider";
import { AccountsSlideSelectItem } from "./AccountsSlideSelectItem";
import { ExpandedAccountSelect } from "./ExpandedAccountSelect";

export type AccountSlideSelectProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  | "type"
  | "readonly"
  | "disabled"
  | "onChange"
> & {
  accounts: Account[];
  errorMessage?: string;
  label: string;
}

export function AccountSlideSelect(props: AccountSlideSelectProps) {
  const [localProps, nativeProps] = splitProps(props, ["accounts", "errorMessage", "label"]);
  const [searchParams, setSearchParams] = useSearchParams();
  let sliderRef: HTMLDivElement | undefined = undefined;
  let inputRef: HTMLInputElement | undefined = undefined;
  const [slider, { current, moveTo, destroy }] = createSlider({
    slides: { origin: "center", perView: 1.1 },
    slideChanged: () => {
      sliderRef?.dispatchEvent(new CustomEvent("slideChanged"));
    }
  });

  const handleSlideChange = () => {
    const currentSlide = current();
    const selectedAccount = localProps.accounts[currentSlide].id;
    if (inputRef) {
      inputRef.value = String(selectedAccount);
      inputRef.dispatchEvent(new Event("input", {
        bubbles: true,
      }));
      inputRef.dispatchEvent(new Event("blur"));
    }
  }

  onMount(async () => {
    slider(sliderRef as HTMLDivElement);
    setTimeout(() => {
      if (nativeProps.value) {
        moveTo(localProps.accounts.findIndex((account) => account.id === Number(nativeProps.value)))
      } else if (inputRef) {
        inputRef.value = String(localProps.accounts[0].id);
        inputRef.dispatchEvent(new Event("input", {
          bubbles: true,
        }));
      }
    }, 50);
    sliderRef?.addEventListener("slideChanged", handleSlideChange);
  });

  onCleanup(() => {
    destroy();
    sliderRef?.removeEventListener("slideChanged", handleSlideChange);
  });

  return (
    <div class="-mx-5 relative">
      <div class="px-4 pb-2 text-muted font-medium">{props.label}</div>
      <div ref={sliderRef}>
        <For each={props.accounts}>
          {account => (
            <AccountsSlideSelectItem
              account={account}
              onClick={() => setSearchParams({ ...setSearchParams, [`select_${nativeProps.name}`]: '1' })}
            />
          )}
        </For>
      </div>
      <Show when={localProps.errorMessage}>
        <p class="text-xs mt-1 px-4 text-red-700 dark:text-red-400">{localProps.errorMessage}</p>
      </Show>
      <div class="flex mt-2 justify-center gap-1.5">
        <For each={localProps.accounts}>
          {(_, index) => (
            <div
              classList={{
                "rounded-full w-2 h-2 cursor-pointer": true,
                "bg-secondary-400 dark:bg-secondary-300": current() === index(),
                "bg-secondary-400/40 dark:bg-secondary-300/40": current() !== index()
              }}
              onClick={() => moveTo(index())}
            />
          )}
        </For>
      </div>
      <Show when={searchParams[`select_${nativeProps.name}`]}>
        <ExpandedAccountSelect
          header={localProps.label}
          accounts={localProps.accounts}
          onSelect={moveTo}
        />
      </Show>
      <input ref={inputRef} type="hidden" {...nativeProps} />
    </div>
  );
}
