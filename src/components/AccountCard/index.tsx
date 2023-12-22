import { createMemo } from "solid-js";
import { Skin } from "@app/constants";
import { transactionsStore, user } from "@app/stores";
import { AmountCard } from "../index";

export function AccountCard(props: { skin: Skin }) {
  const transactionsLoaded = createMemo(() => {
    return transactionsStore.transactions().status === "success";
  });

  return (
    <div class="px-10 py-5 relative max-w-sm my-6 mx-auto rounded-[30px]" style={`background-image: url('${props.skin.image}'); color: ${props.skin.primaryTextColor}; aspect-ratio: 100/67; background-size: contain; background-position: center; background-repeat: no-repeat`}>
      <div class="font-semibold text-xl">Primary Account</div>
      <div class={`absolute ${props.skin.balancePlacement}`}>
        <div class="flex flex-col">
          <div class="text-xs font-normal" style={`color: ${props.skin.secondaryTextColor}`}>Balance</div>
          <div class="text-2xl font-bold">$5600</div>
        </div>
      </div>
      <div class="absolute left-0 bottom-6 px-8 w-full flex gap-6 content-between">
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
      </div>
    </div>
  )
}