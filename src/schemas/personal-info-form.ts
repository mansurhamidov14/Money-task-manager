import * as yup from "yup";
import { t } from "@app/i18n";
import { MIN_FIRST_NAME_LENGTH, MIN_LAST_NAME_LENGTH } from "./constants";

type PersonalInfoForm = {
  firstName: string;
  lastName: string;
}

export function getPersonalInfoSchema(defaults: PersonalInfoForm): yup.Schema<PersonalInfoForm> {
  return yup.object({
    firstName: yup.string()
      .required(t("common.FormFields.required"))
      .min(MIN_FIRST_NAME_LENGTH, t("common.FormFields.tooShort", undefined, { count: MIN_FIRST_NAME_LENGTH }))
      .default(defaults.firstName),
    lastName: yup.string()
      .required(t("common.FormFields.required"))
      .min(MIN_LAST_NAME_LENGTH, t("common.FormFields.tooShort", undefined, { count: MIN_LAST_NAME_LENGTH }))
      .default(defaults.lastName),
  });
}
