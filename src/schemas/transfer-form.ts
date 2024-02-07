import { string, number, object, Schema, ref } from "yup";
import { t } from "@app/i18n";
import { Account } from "@app/stores";

type TransferForm = {
  title: string;
  expenseAmount: number;
  incomeAmount: number;
  fromAccount: number;
  toAccount: number;
  date: string;
}

export function getTransferFormSchema(
  defaults: Partial<TransferForm>,
  userAccounts: Account[]
): Schema<TransferForm> {
  const userAccountIds = userAccounts.map(account => account.id);

  return object({
    title: string()
      .required(t("common.FormFields.required"))
      .default(defaults.title),
    expenseAmount: number()
      .required(t("common.FormFields.required"))
      .typeError(t("NewTransactionScreen.FormFields.amount.invalidFormat"))
      .default(defaults.expenseAmount),
    incomeAmount: number()
      .required(t("common.FormFields.required"))
      .typeError(t("NewTransactionScreen.FormFields.amount.invalidFormat"))
      .default(defaults.incomeAmount),
    toAccount: number()
      .required(t("common.FormFields.required"))
      .typeError(t("common.FormFields.required"))
      .oneOf(userAccountIds)
      .default(defaults.toAccount)
      .notOneOf([ref("fromAccount")], "Transfer accounts can not be same"),
    fromAccount: number()
      .required(t("common.FormFields.required"))
      .typeError(t("common.FormFields.required"))
      .oneOf(userAccountIds)
      .default(defaults.fromAccount)
      .notOneOf([ref("toAccount")], "Transfer accounts can not be same"),
    date: string()
      .required(t("common.FormFields.required"))
      .default(defaults.date)
  });
}
