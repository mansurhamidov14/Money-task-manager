import { Show, createMemo } from "solid-js";
import { FaSolidArrowTrendDown, FaSolidArrowTrendUp } from "solid-icons/fa";
import { CurrencyCode, currencies } from "@app/constants";
import { Message } from "@app/i18n";
import { TransactionType } from "@app/stores";
import "./style.css";

export type AmountCardContentProps = {
  loading: boolean;
  amount: number | null;
  currency: CurrencyCode;
  type: TransactionType;
}

export function AmountCard(props: AmountCardContentProps) {
  const renderParams = createMemo(() => {
    const params = {
      amountPrefix: "-",
      icon: <FaSolidArrowTrendDown />
    };

    if (props.type === "income") {
      params.amountPrefix = "";
      params.icon = <FaSolidArrowTrendUp />
    }
    return params;
  });

  const formattedAmount = createMemo(() => {
    if (props.amount == null) {
      return "";
    }
    
    return `${currencies[props.currency].formatter(props.amount)}`
  });

  return (
    <div class={`amount-card ${props.type}`}>
      <div>
        <div class="text-sm">
          <Message>{`common.${props.type}`}</Message>
        </div>
        <Show
          when={!props.loading}
          fallback={<div class="bg-gray-50/25 rounded-md h-5 w-[52px] animate-pulse mt-3" />}
        >
          <div class="mt-1 text-xl font-semibold">
            {renderParams().amountPrefix}{formattedAmount()}
          </div>
        </Show>
      </div>
      <div class="mt-1 text-3xl pr-4">{renderParams().icon}</div>
    </div>
  );
}