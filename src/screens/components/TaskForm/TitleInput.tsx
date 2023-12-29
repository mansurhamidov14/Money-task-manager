import { Field } from "solid-form-handler";
import { TextInput } from "@app/components";
import { t } from "@app/i18n";
import { InputProps } from "./types";

export function TitleInput(props: InputProps) {
  return (
    <Field
      mode="input"
      name="title"
      formHandler={props.formHandler}
      render={(field) => (
        <TextInput
          autocomplete="off"
          id="title"
          label={t("NewTaskScreen.FormFields.title.label")}
          placeholder={t("NewTaskScreen.FormFields.title.placeholder")}
          errorMessage={field.helpers.errorMessage}
          {...field.props}
        />
      )}
    />
  );
}
