import { t } from "../../i18n";
import { AmountCardContent } from "../AmountCardContent";
import { FaSolidArrowTrendDown } from "solid-icons/fa";

export type ExpenseAmountCardProps = {
  amount: string;
}

export function ExpenseAmountCard(props: ExpenseAmountCardProps) {
  return (
    <div class="bg-rose-400 shadow-lg shadow-rose-400/50 flex-1 rounded-lg">
      <AmountCardContent
        label={t("expense")}
        amount={`-${props.amount}`}
        icon={<FaSolidArrowTrendDown />}
      />
    </div>
  );
}
