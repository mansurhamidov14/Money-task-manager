import { Account, CategoryId, TransactionType } from "@app/entities";
import { t } from "@app/i18n";
import { categoryService } from "@app/services";
import { Schema, number, object, string } from "yup";

export type TransactionForm = {
  title: string;
  type: TransactionType;
  category: CategoryId;
  amount: number;
  account: Account["id"];
  date: string;
}

export function getTransactionFormSchema(
  defaults: Partial<TransactionForm>,
  userAccounts: Account[]
): Schema<TransactionForm> {
  const userAccountIds = userAccounts.map(account => account.id);

  return object({
    title: string()
      .required(t("common.FormFields.required"))
      .default(defaults.title),
    type: string()
      .required(t("common.FormFields.required"))
      .oneOf(["income", "expense"] as const)
      .default(defaults.type),
    category: string()
      .required()
      .oneOf(categoryService.ids)
      .default(defaults.category),
    amount: number()
      .required(t("common.FormFields.required"))
      .typeError(t("NewTransactionScreen.FormFields.amount.invalidFormat"))
      .default(defaults.amount),
    account: number()
      .required()
      .typeError(t("common.FormFields.required"))
      .oneOf(userAccountIds)
      .default(defaults.account),
    date: string()
      .required(t("common.FormFields.required"))
      .default(defaults.date)
  });
}
