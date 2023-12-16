import { createMemo } from "solid-js";
import { FaSolidArrowTrendDown } from "solid-icons/fa";
import { t } from "@app/i18n";
import { AmountCardContent } from "../AmountCardContent";
import { CurrencyCode, currencies } from "@app/constants";

export type ExpenseAmountCardProps = {
  amount: number | null;
  currency: CurrencyCode;
  loading: boolean;
}


export function ExpenseAmountCard(props: ExpenseAmountCardProps) {
  const formattedAmount = createMemo(() => {
    if (props.amount == null) {
      return "";
    }
    return `-${currencies[props.currency].formatter(props.amount)}`
  });

  return (
    <div class="bg-rose-400 dark:bg-rose-400/90 shadow-lg shadow-rose-400/50 dark:shadow-rose-400/30 flex-1 rounded-lg">
      <AmountCardContent
        loading={props.loading}
        label={t("common.expense")}
        amount={formattedAmount()}
        icon={<FaSolidArrowTrendDown />}
      />
    </div>
  );
}
