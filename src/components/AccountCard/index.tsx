import { ParentProps, createMemo } from "solid-js";
import { currencies, skins } from "@app/constants";
import { Account, transactionsStore, user } from "@app/stores";
import { AmountCard } from "../index";

export type AccountCardProps = {
  account: Account;
}

export function AccountCardDumb(props: ParentProps<AccountCardProps>) {
  const skin = createMemo(() => {
    return skins[props.account.skin];
  });

  return (
    <div class="px-5">
      <div
        class="px-8 py-5 relative max-w-sm my-3 mx-auto rounded-[20px] shadow-md shadow-gray-700 dark:shadow-gray-200/20"
        style={`background-image: url('${skin().image}'); color: ${skin().primaryTextColor}; aspect-ratio: 100/67; background-size: cover; background-position: center; background-repeat: no-repeat`}
      >
        <div class="font-semibold text-xl">{props.account.title}</div>
        <div class={`absolute ${skin().balancePlacement}`}>
          <div class="flex flex-col">
            <div class="text-xs font-normal" style={`color: ${skin().secondaryTextColor}`}>Balance</div>
            <div class="text-2xl font-bold">
              {currencies[props.account.currency].formatter(props.account.balance)}
            </div>
          </div>
        </div>
        <div class="absolute left-0 bottom-6 px-8 w-full flex gap-6 content-between">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export function AccountCard(props: AccountCardProps) {
  const transactionsLoaded = createMemo(() => {
    return transactionsStore.transactions().status === "success";
  });

  return (
    <AccountCardDumb account={props.account}>
      <AmountCard
        amount={transactionsStore.incomeForTheMonth()}
        currency={user.currentUser().data!.primaryCurrency}
        loading={!transactionsLoaded()}
        type="income"
      />
      <AmountCard
        amount={transactionsStore.expensesForTheMonth()}
        currency={user.currentUser().data!.primaryCurrency}
        loading={!transactionsLoaded()}
        type="expense"
      />
    </AccountCardDumb>
  );
}
