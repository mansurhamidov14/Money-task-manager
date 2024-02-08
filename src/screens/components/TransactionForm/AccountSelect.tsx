import { Field } from "solid-form-handler";
import { AccountSlideSelect } from "@app/components";
import { t } from "@app/i18n";
import { accountsStore } from "@app/stores";
import { InputProps } from "../shared";

export function AccountSelect(props: InputProps) {
  return (
    <Field
      mode="input"
      name="account"
      formHandler={props.formHandler}
      render={(field) => (
        <AccountSlideSelect
          label={t("NewTransactionScreen.FormFields.account")}
          errorMessage={field.helpers.errorMessage}
          accounts={accountsStore.accounts().data!}
          {...field.props}
        />
      )}
    />
  );
}
