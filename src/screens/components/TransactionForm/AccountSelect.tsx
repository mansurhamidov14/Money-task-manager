import { Field } from "solid-form-handler";
import { AccountSlideSelect } from "@app/components";
import { t } from "@app/i18n";
import { InputProps } from "../shared";
import { useAccounts } from "@app/hooks";

export function AccountSelect(props: InputProps) {
  const { accounts } = useAccounts();
  return (
    <Field
      mode="input"
      name="account"
      formHandler={props.formHandler}
      render={(field) => (
        <AccountSlideSelect
          label={t("NewTransactionScreen.FormFields.account")}
          errorMessage={field.helpers.errorMessage}
          accounts={accounts().data!}
          {...field.props}
        />
      )}
    />
  );
}
