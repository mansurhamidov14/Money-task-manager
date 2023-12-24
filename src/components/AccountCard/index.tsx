import { ParentProps, Show, createMemo, createSignal } from "solid-js";
import { currencies, skins } from "@app/constants";
import { Account, accountsStore, counters } from "@app/stores";
import { AmountCard } from "../index";
import { Message } from "@app/i18n";

import "./style.css";

export type AccountCardProps = {
  account: Account;
  hasBackSide?: boolean;
}

export function AccountCardDumb(props: ParentProps<AccountCardProps>) {
  const skin = createMemo(() => {
    return skins[props.account.skin];
  });

  const [flipped, setFlipped] = createSignal(false);
  const toggleFlip = () => setFlipped(v => !v);

  const handleMouseLeave = () => {
    if (flipped()) {
      setFlipped(false);
    }
  }

  return (
    <div class="p-5">
      <div class="account-card-scene" onMouseLeave={handleMouseLeave}>
        <div
          class="account-card"
          classList={{ "is-flipped": flipped() && props.hasBackSide }}
          onClick={toggleFlip}
        >
          <div
            class="account-card-face account-card-face--front"
            style={`background-image: url('${skin().image}'); color: ${skin().primaryTextColor};`}
          >
            <div class="font-semibold text-xl">{props.account.title}</div>
            <div class={`absolute ${skin().balancePlacement}`}>
              <div class="flex flex-col">
                <div class="text-xs font-normal" style={`color: ${skin().secondaryTextColor}`}>
                  <Message>common.balance</Message>
                </div>
                <div class="text-2xl font-bold">
                  {currencies[props.account.currency].formatter(props.account.balance)}
                </div>
              </div>
            </div>
            <div class="absolute left-0 bottom-6 px-8 w-full flex gap-6 content-between">
              {props.children}
            </div>
          </div>
          <Show when={props.hasBackSide}>
            <div class="account-card-face account-card-face--back" />
          </Show>
        </div>
      </div>
    </div>
  );
}

export function AccountCard(props: AccountCardProps) {
  const accountsLoaded = createMemo(() => {
    return accountsStore.accounts().status === "success";
  });

  return (
    <AccountCardDumb account={props.account} hasBackSide={props.hasBackSide}>
      <AmountCard
        amount={counters[props.account.id].totalIncome()}
        currency={props.account.currency}
        loading={!accountsLoaded()}
        type="income"
      />
      <AmountCard
        amount={-counters[props.account.id].totalExpense()}
        currency={props.account.currency}
        loading={!accountsLoaded()}
        type="expense"
      />
    </AccountCardDumb>
  );
}
