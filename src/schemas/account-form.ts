import * as yup from "yup";
import type { CurrencyCode } from "@app/entities";
import { t } from "@app/i18n";
import { currencyService } from "@app/services";

export type AccountForm = {
  title: string;
  balance: number;
  currency: CurrencyCode;
  primary: "0" | "1";
  skin: string;
}

export function getAccountFormSchema(defaults: Partial<AccountForm>): yup.Schema<AccountForm> {
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
      .oneOf(currencyService.availableCurrencyCodes)
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
