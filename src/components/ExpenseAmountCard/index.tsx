import { createMemo } from "solid-js";
import { FaSolidArrowTrendDown } from "solid-icons/fa";
import { t } from "@app/i18n";
import { AmountCardContent } from "../AmountCardContent";

export type ExpenseAmountCardProps = {
  amount: () => number | null;
  currencySign: string;
  loading: () => boolean;
}


export function ExpenseAmountCard({ amount, currencySign, loading }: ExpenseAmountCardProps) {
  const formattedAmount = createMemo(() => {
    return `-${currencySign}${amount()?.toFixed(2)}`
  });

  return (
    <div class="bg-rose-400 shadow-lg shadow-rose-400/50 flex-1 rounded-lg">
      <AmountCardContent
        loading={loading}
        label={t("common.expense")}
        amount={formattedAmount}
        icon={<FaSolidArrowTrendDown />}
      />
    </div>
  );
}
