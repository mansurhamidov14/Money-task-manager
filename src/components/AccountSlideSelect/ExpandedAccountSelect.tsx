import { Account } from "@app/stores"
import { ScreenHeader, VerticalScroll } from "..";
import { For } from "solid-js";
import { AccountsSlideSelectItem } from "./AccountsSlideSelectItem";

export type ExpandedAccountSelectProps = {
  accounts: Account[];
  header: string;
  onSelect: (itemIdx: number) => void;
}

export function ExpandedAccountSelect(props: ExpandedAccountSelectProps) {
  return (
    <div class="w-full h-[100svh] fixed top-0 left-0 bg-secondary-100 dark:bg-gray-800 z-50">
      <ScreenHeader withGoBackButton title={props.header} />
      <div class="py-3 px-2">
        <VerticalScroll>
          <div class="flex flex-col gap-3">
            <For each={props.accounts}>
              {(account, index) => (
                <AccountsSlideSelectItem
                  account={account}
                  onClick={() => {
                    props.onSelect(index());
                    history.back();
                  }}
                />
              )}
            </For>
          </div>
        </VerticalScroll>
      </div>
    </div>
  );
}