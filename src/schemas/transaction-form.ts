import * as yup from "yup";
import { t } from "@app/i18n";
import { Categories, CategoryId } from "@app/constants";
import { Account, TransactionType } from "@app/stores";

type NewTransactionForm = {
  title: string;
  type: TransactionType;
  category: CategoryId;
  amount: number;
  account: number;
  date: string;
}

export function getNewTransactionSchema(
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
      .oneOf(Object.keys(Categories) as CategoryId[])
      .default(defaults.category),
    amount: yup.number()
      .required(t("common.FormFields.required"))
      .typeError(t("NewTransactionScreen.FormFields.amount.invalidFormat")),
    account: yup.number()
      .required()
      .oneOf(userAccountIds)
      .default(defaults.account),
    date: yup.string()
      .required(t("common.FormFields.required"))
      .default(defaults.date)
  });
}
