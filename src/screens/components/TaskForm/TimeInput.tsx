import { Field } from "solid-form-handler";
import { TextInputWithFloatingLabel } from "@app/components";
import { InputProps } from "./types";
import { t } from "@app/i18n";

type TimeInputProps = InputProps & {
  name: string;
}

export function TimeInput(props: TimeInputProps) {
  return (
    <Field
      mode="input"
      name={props.name}
      formHandler={props.formHandler}
      render={(field) => (
        <TextInputWithFloatingLabel
          id="date"
          type="time"
          label={t("NewTaskScreen.FormFields.time")}
          errorMessage={field.helpers.errorMessage}
          {...field.props}
        />
      )}
    />
  );
}
