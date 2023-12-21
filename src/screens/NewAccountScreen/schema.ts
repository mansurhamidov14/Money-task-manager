import * as yup from "yup";
import { t } from "@app/i18n";
import { CurrencyCode } from "@app/constants";

type NewAccountForm = {
  title: string;
  balance: number;
  currency: CurrencyCode;
  primary: "0" | "1";
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
    primary: yup
      .mixed<"1" | "0">()
      .oneOf(["1", "0"])
      .default("0"),
  });
}
