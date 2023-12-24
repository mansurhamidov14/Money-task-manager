import { Field } from "solid-form-handler";
import { TextInputWithFloatingLabel } from "@app/components";
import { t } from "@app/i18n";
import { InputProps } from "./types";

export function DateTimeInput(props: InputProps) {
  return (
    <Field
      mode="input"
      name="date"
      formHandler={props.formHandler}
      render={(field) => (
        <TextInputWithFloatingLabel
        id="date"
        type="datetime-local"
        label={t("NewTransactionScreen.FormFields.dateTime")}
        errorMessage={field.helpers.errorMessage}
        {...field.props}
        />
      )}
    />
  );
}
