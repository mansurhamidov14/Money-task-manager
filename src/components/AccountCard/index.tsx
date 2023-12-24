import { ParentProps, Show, createMemo, createSignal } from "solid-js";
import { currencies, skins } from "@app/constants";
import { Account, Link, accountsStore, counters } from "@app/stores";
import { AmountCard, Button } from "../index";
import { Action, Message } from "@app/i18n";

import "./style.css";
import { IoPencil, IoTrash } from "solid-icons/io";

export type AccountCardProps = {
  account: Account;
  hasBackSide?: boolean;
}

export function AccountCardDumb(props: ParentProps<AccountCardProps>) {
  const [flipped, setFlipped] = createSignal(false);
  const skin = createMemo(() => {
    return skins[props.account.skin];
  });


  const handleFlip = (event: MouseEvent & {currentTarget: HTMLDivElement; target: Element;}) => {
    if (!event.target.closest(".btn")) {
      setFlipped(v => !v);
    }
  }

  const handleMouseLeave = () => {
    if (flipped()) {
      setFlipped(false);
    }
  }

  return (
    <div class="px-5 py-6">
      <div class="account-card-scene" onMouseLeave={handleMouseLeave}>
        <div
          class="account-card"
          classList={{ "is-flipped": flipped() && props.hasBackSide }}
          onClick={handleFlip}
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
            <div class="account-card-face account-card-face--back" style={`background-color: ${skin().color}`}>
              <div class="h-16 bg-black mt-6"></div>
              <div class="mt-4 mr-6 bg-white text-end flex flex-col justify-around relative h-8">
                <div class="h-0.5 bg-cyan-100"></div>
                <div class="h-0.5 bg-cyan-100"></div>
                <div class="h-0.5 bg-cyan-100"></div>
                <div class="h-0.5 bg-cyan-100"></div>
                <div class="text-black pt-1 pb-1 pr-4 font-semibold absolute right-0">
                  {100 + props.account.id}
                </div>
              </div>
              <div class="mt-5 flex justify-around px-14 opacity-80">
                <Link href={`/edit-account/${props.account.id}`} class="btn btn-lg btn-primary px-5">
                  <IoPencil class="text-xl" />
                  <span class="sr-only">
                    <Action>Edit</Action>
                  </span>
                </Link>
                <Button variant="danger" size="lg" class="px-5">
                  <IoTrash class="text-xl" />
                  <span class="sr-only">
                    <Action>Delete</Action>
                  </span>
                </Button>
              </div>
            </div>
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
