import * as yup from "yup";
import { t } from "@app/i18n";
import { CurrencyCode } from "@app/constants";

type NewAccountForm = {
  title: string;
  balance: number;
  currency: CurrencyCode;
}

export function getNewAccountSchema(defaults: Partial<NewAccountForm>): yup.Schema<NewAccountForm> {
  return yup.object({
    title: yup.string()
      .required(t("common.FormFields.required"))
      .default(defaults.title),
    balance: yup.number()
      .required(t("common.FormFields.required"))
      .typeError(t("NewAccountScreen.FormFields.balance.invalidFormat")),
    currency: yup.string()
      .required()
      .oneOf(Object.values(CurrencyCode))
      .default(defaults.currency),
  });
}
