import { Field } from "solid-form-handler";
import { TextInputWithFloatingLabel } from "@app/components";
import { InputProps } from "./types";

type DateInputProps = InputProps & {
  name: string;
  label: string;
}

export function DateInput(props: DateInputProps) {
  return (
    <Field
      mode="input"
      name={props.name}
      formHandler={props.formHandler}
      render={(field) => (
        <TextInputWithFloatingLabel
          id="date"
          type="date"
          label={props.label}
          errorMessage={field.helpers.errorMessage}
          {...field.props}
        />
      )}
    />
  );
}
