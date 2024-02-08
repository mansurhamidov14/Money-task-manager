import { Account } from "@app/stores"
import { ScreenHeader, VerticalScroll } from "..";
import { For } from "solid-js";
import { AccountsSlideSelectItem } from "./AccountsSlideSelectItem";

export type ExpandedAccountSelectProps = {
  accounts: Account[];
  visible: boolean;
  header: string;
  onSelect: (itemIdx: number) => void;
}

export function ExpandedAccountSelect(props: ExpandedAccountSelectProps) {
  return (
    <div classList={{"ass-expanded": true, "ass-expanded--visible": props.visible}}>
      <ScreenHeader withGoBackButton title={props.header} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <div class="flex flex-col gap-3 py-3 px-2">
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
  );
}