import { t } from "../../i18n";
import { AmountCardContent } from "../AmountCardContent";
import { FaSolidArrowTrendUp } from "solid-icons/fa";

export type IncomeAmountCardProps = {
  amount: string;
}

export function IncomeAmountCard(props: IncomeAmountCardProps) {
  return (
    <div class="bg-emerald-400 shadow-lg shadow-emerald-400/50 flex-1 rounded-lg">
      <AmountCardContent
        label={t("common.income")}
        amount={props.amount}
        icon={<FaSolidArrowTrendUp />}
      />
    </div>
  );
}