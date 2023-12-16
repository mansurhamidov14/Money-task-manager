import { createMemo } from "solid-js";
import { FaSolidArrowTrendUp } from "solid-icons/fa";
import { t } from "@app/i18n";
import { AmountCardContent } from "../AmountCardContent";
import { CurrencyCode, currencies } from "@app/constants";

export type IncomeAmountCardProps = {
  amount: number | null;
  currency: CurrencyCode;
  loading: boolean;
}

export function IncomeAmountCard(props: IncomeAmountCardProps) {
  const formattedAmount = createMemo(() => {
    if (props.amount == null) {
      return "";
    }
    return currencies[props.currency].formatter(props.amount || 0);
  });

  return (
    <div class="bg-teal-400 dark:bg-teal-400/90 shadow-lg shadow-teal-400/50 dark:shadow-teal-400/30 flex-1 rounded-lg">
      <AmountCardContent
        loading={props.loading}
        label={t("common.income")}
        amount={formattedAmount()}
        icon={<FaSolidArrowTrendUp />}
      />
    </div>
  );
}