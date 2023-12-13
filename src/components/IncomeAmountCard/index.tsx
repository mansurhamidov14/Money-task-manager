import { createMemo } from "solid-js";
import { FaSolidArrowTrendUp } from "solid-icons/fa";
import { t } from "@app/i18n";
import { AmountCardContent } from "../AmountCardContent";

export type IncomeAmountCardProps = {
  amount: () => number | null;
  currencySign: string;
  loading: () => boolean;
}

export function IncomeAmountCard({ amount, currencySign, loading }: IncomeAmountCardProps) {
  const formattedAmount = createMemo(() => {
    return `${currencySign}${amount()?.toFixed(2)}`;
  });

  return (
    <div class="bg-emerald-400 shadow-lg shadow-emerald-400/50 flex-1 rounded-lg">
      <AmountCardContent
        loading={loading}
        label={t("common.income")}
        amount={formattedAmount}
        icon={<FaSolidArrowTrendUp />}
      />
    </div>
  );
}