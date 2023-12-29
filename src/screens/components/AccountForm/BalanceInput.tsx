import { Field } from "solid-form-handler";
import { TextInput } from "@app/components";
import { t } from "@app/i18n";
import { InputProps } from "./types";

export function BalanceInput(props: InputProps) {
  return (
    <Field
      mode="input"
      name="balance"
      formHandler={props.formHandler}
      render={(field) => (
        <TextInput
          id="balance"
          label={t("NewAccountScreen.FormFields.balance.label")}
          placeholder="0.00"
          inputMode="numeric"
          errorMessage={field.helpers.errorMessage}
          {...field.props}
        />
      )}
    />
  );
}
