import * as yup from "yup";
import { t } from "@app/i18n";
import { CurrencyCode } from "@app/services";

type NewAccountForm = {
  title: string;
  balance: number;
  currency: CurrencyCode;
  primary: "0" | "1";
  skin: string;
}

export function getAccountFormSchema(defaults: Partial<NewAccountForm>): yup.Schema<NewAccountForm> {
  return yup.object({
    title: yup.string()
      .required(t("common.FormFields.required"))
      .default(defaults.title),
    balance: yup.number()
      .required(t("common.FormFields.required"))
      .typeError(t("NewAccountScreen.FormFields.balance.invalidFormat"))
      .default(defaults.balance),
    currency: yup.string()
      .required()
      .oneOf(Object.values(CurrencyCode))
      .default(defaults.currency),
    primary: yup
      .mixed<"1" | "0">()
      .oneOf(["1", "0"])
      .default(defaults.primary ?? "0"),
    skin: yup
      .string()
      .default(defaults.skin ?? "green")
  });
}
