import * as yup from "yup";
import { t } from "@app/i18n";
import { Account, TransactionType } from "@app/stores";
import { CategoryId, categoryService } from "@app/services";

type NewTransactionForm = {
  title: string;
  type: TransactionType;
  category: CategoryId;
  amount: number;
  account: Account['id'];
  date: string;
}

export function getTransactionFormSchema(
  defaults: Partial<NewTransactionForm>,
  userAccounts: Account[]
): yup.Schema<NewTransactionForm> {
  const userAccountIds = userAccounts.map(account => account.id);

  return yup.object({
    title: yup.string()
      .required(t("common.FormFields.required"))
      .default(defaults.title),
    type: yup.string()
      .required(t("common.FormFields.required"))
      .oneOf(["income", "expense"] as const)
      .default(defaults.type),
    category: yup.string()
      .required()
      .oneOf(categoryService.ids)
      .default(defaults.category),
    amount: yup.number()
      .required(t("common.FormFields.required"))
      .typeError(t("NewTransactionScreen.FormFields.amount.invalidFormat"))
      .default(defaults.amount),
    account: yup.string()
      .required()
      .typeError(t("common.FormFields.required"))
      .oneOf(userAccountIds)
      .default(defaults.account),
    date: yup.string()
      .required(t("common.FormFields.required"))
      .default(defaults.date)
  });
}
