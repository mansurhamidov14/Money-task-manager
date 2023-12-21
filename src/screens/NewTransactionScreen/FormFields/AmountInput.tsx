import { TextInputWithFloatingLabel } from "@app/components";
import { t } from "@app/i18n";
import { Field } from "solid-form-handler";
import { InputProps } from "./types";

export function AmountInput(props: InputProps) {
  return (
    <Field
      mode="input"
      name="amount"
      formHandler={props.formHandler}
      render={(field) => (
        <TextInputWithFloatingLabel
          id="amount"
          label={t("NewTransactionScreen.FormFields.amount.label")}
          placeholder="0.00"
          inputMode="numeric"
          errorMessage={field.helpers.errorMessage}
          {...field.props}
        />
      )}
    />
  );
}
