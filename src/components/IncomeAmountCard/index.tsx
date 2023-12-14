import { createMemo } from "solid-js";
import { FaSolidArrowTrendUp } from "solid-icons/fa";
import { t } from "@app/i18n";
import { AmountCardContent } from "../AmountCardContent";
import { CurrencyCode, currencies } from "@app/constants";

export type IncomeAmountCardProps = {
  amount: () => number | null;
  currency: CurrencyCode;
  loading: () => boolean;
}

export function IncomeAmountCard({ amount, currency, loading }: IncomeAmountCardProps) {
  const formattedAmount = createMemo(() => {
    if (amount() == null) {
      return "";
    }
    return currencies[currency].formatter(amount()! || 0);
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