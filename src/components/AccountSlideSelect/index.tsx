import { Account } from "@app/stores";
import { useSearchParams } from "@solidjs/router";
import { For, JSX, Show, createMemo, onCleanup, onMount, splitProps } from "solid-js";
import { createSlider } from "solid-slider";
import { AccountsSlideSelectItem } from "./AccountsSlideSelectItem";
import { ExpandedAccountSelect } from "./ExpandedAccountSelect";
import "./style.css";
import { MAXIMIZE_PARAM_KEY } from "./consts";
import { Button } from "..";
import { Message } from "@app/i18n";

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
  const hasMoreThan1Accounts = createMemo(() => localProps.accounts.length > 1);
  const [searchParams, setSearchParams] = useSearchParams();
  let sliderRef: HTMLDivElement | undefined = undefined;
  let inputRef: HTMLInputElement | undefined = undefined;
  const [slider, { current, moveTo, destroy }] = createSlider({
    slides: { origin: "center", perView: hasMoreThan1Accounts() ? 1.1 : 1.05 },
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

  const expandSelect = () => {
    if (hasMoreThan1Accounts()) {
      setSearchParams({ ...setSearchParams, [MAXIMIZE_PARAM_KEY]: nativeProps.name })
    }
  }

  onCleanup(() => {
    destroy();
    sliderRef?.removeEventListener("slideChanged", handleSlideChange);
  });

  return (
    <div class="-mx-5 relative">
      <div class="px-4 pb-2 flex justify-between items-center">
        <div class="pl-3 text-sm text-muted font-medium">
          {props.label}
        </div>
        <Show when={hasMoreThan1Accounts()}>
          <Button type="button" size="xs" variant="ghost" preserveCase onClick={expandSelect}>
            <Message>common.allAccounts</Message>
          </Button>
        </Show>
      </div>
      <div ref={sliderRef}>
        <For each={props.accounts}>
          {account => <AccountsSlideSelectItem account={account} onClick={expandSelect} />}
        </For>
      </div>
      <Show when={localProps.errorMessage}>
        <p class="text-xs mt-1 pl-7 pr-4 text-red-700 dark:text-red-400">{localProps.errorMessage}</p>
      </Show>
      <div class="flex py-1.5 justify-center gap-1.5">
        <Show when={hasMoreThan1Accounts()}>
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
        </Show>
      </div>
      <ExpandedAccountSelect
        header={localProps.label}
        accounts={localProps.accounts}
        onSelect={moveTo}
        visible={searchParams[MAXIMIZE_PARAM_KEY] === nativeProps.name}
      />
      <input ref={inputRef} type="hidden" {...nativeProps} />
    </div>
  );
}
