import * as yup from 'yup';
import { t } from '@app/i18n';

type LoginForm = {
  email: string;
  password: string;
}

export function getLoginFormSchema(defaultEmail?: string): yup.Schema<LoginForm> {
  return yup.object({
    email: yup.string().required(t("common.FormFields.required")).default(defaultEmail),
    password: yup.string().required(t("common.FormFields.required"))
  });
}
