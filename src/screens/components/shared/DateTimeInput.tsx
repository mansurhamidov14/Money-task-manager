import { Field } from "solid-form-handler";
import { TextInput } from "@app/components";
import { t } from "@app/i18n";
import { InputProps } from "./types";

export function DateTimeInput(props: InputProps) {
  return (
    <Field
      mode="input"
      name="date"
      formHandler={props.formHandler}
      render={(field) => (
        <TextInput
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
