import * as yup from "yup";
import { t } from "@app/i18n";
import { Categories, CategoryId, CurrencyCode } from "@app/constants";
import { TransactionType } from "@app/stores";

type NewTransactionForm = {
  title: string;
  type: TransactionType;
  category: CategoryId;
  amount: number;
  currency: CurrencyCode;
  date: string;
}

export function getNewTransactionSchema(defaults: Partial<NewTransactionForm>): yup.Schema<NewTransactionForm> {
  return yup.object({
    title: yup.string()
      .required(t("NewTransactionScreen.FormFields.common.required"))
      .default(defaults.title),
    type: yup.string()
      .required(t("NewTransactionScreen.FormFields.common.required"))
      .oneOf(["income", "expense"] as const)
      .default(defaults.type),
    category: yup.string()
      .required()
      .oneOf(Object.keys(Categories) as CategoryId[])
      .default(defaults.category),
    amount: yup.number()
      .required(t("NewTransactionScreen.FormFields.common.required"))
      .typeError(t("NewTransactionScreen.FormFields.amount.invalidFormat")),
    currency: yup.string()
      .required()
      .oneOf(Object.values(CurrencyCode))
      .default(defaults.currency),
    date: yup.string()
      .required(t("NewTransactionScreen.FormFields.common.required"))
      .default(defaults.date)
  });
}
