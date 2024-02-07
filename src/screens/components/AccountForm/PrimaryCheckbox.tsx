import { Field } from "solid-form-handler";
import { t } from "@app/i18n";
import { CheckBox } from "@app/components";
import { InputProps } from "../shared";

export function PrimaryCheckbox(props: InputProps) {
  return (
    <Field
      name="primary"
      mode="checkbox"
      value="1"
      uncheckedValue="0"
      formHandler={props.formHandler}
      render={(field) => (
        <CheckBox label={t("NewAccountScreen.FormFields.primary")} {...field.props} />
      )}
    />
  );
}