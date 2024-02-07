import { object, ref, string, type Schema } from "yup";
import { t } from "@app/i18n";
import { MIN_PASSWORD_LENGTH } from "./constants";

type SignUpForm = {
  password: string;
  newPassword: string;
  repeatPassword: string;
}

export function getChangePasswordSchema(): Schema<SignUpForm> {
  return object({
    password: string()
      .required(t("common.FormFields.required")),
    newPassword: string()
      .required(t("common.FormFields.required"))
      .min(MIN_PASSWORD_LENGTH, t("common.FormFields.tooShort", undefined, { count: MIN_PASSWORD_LENGTH })),
    repeatPassword: string()
      .required(t("common.FormFields.required"))
      .min(MIN_PASSWORD_LENGTH, t("common.FormFields.tooShort", undefined, { count: MIN_PASSWORD_LENGTH }))
      .oneOf([ref("newPassword"), ""], t("SettingsScreen.changePassword.passwordsDoNotMatch"))
  });
}
