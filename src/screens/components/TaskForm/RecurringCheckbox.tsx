import { Field } from "solid-form-handler";
import { InputProps } from "./types";
import { t } from "@app/i18n";
import { CheckBox } from "@app/components";

export function RecurringCheckbox(props: InputProps) {
  return (
    <Field
      name="isRecurring"
      mode="checkbox"
      value="1"
      uncheckedValue="0"
      formHandler={props.formHandler}
      render={(field) => (
        <CheckBox label={t("NewTaskScreen.FormFields.recurring")} {...field.props} />
      )}
    />
  );
}