import { Show, createMemo } from "solid-js";
import { FaSolidArrowTrendDown, FaSolidArrowTrendUp } from "solid-icons/fa";
import { Message } from "@app/i18n";
import { TransactionType } from "@app/stores";
import { type CurrencyCode, currencyService } from "@app/services";
import "./style.css";

export type AmountCardContentProps = {
  loading?: boolean;
  amount: number | null;
  currency: CurrencyCode;
  type: TransactionType;
}

export function AmountCard(props: AmountCardContentProps) {
  const renderIcon = createMemo(() => {
    return {
      income: <FaSolidArrowTrendUp size={20} />,
      expense: <FaSolidArrowTrendDown size={20} />
    }[props.type];
  });

  const formattedAmount = createMemo(() => {
    if (props.amount == null) {
      return "";
    }
    return currencyService.formatValue(props.currency, props.amount);
  });

  return (
    <div class={`amount-card ${props.type}`}>
      <div>
        <div class="text-xs font-medium">
          <Message>{`common.${props.type}`}</Message>
        </div>
        <Show
          when={!props.loading}
          fallback={<div class="bg-gray-50/25 rounded-md h-5 w-[52px] animate-pulse mt-3" />}
        >
          <div class="mt-1 font-bold text-sm">
            {formattedAmount()}
          </div>
        </Show>
      </div>
      <div class="mt-1 pr-4">{renderIcon()}</div>
    </div>
  );
}