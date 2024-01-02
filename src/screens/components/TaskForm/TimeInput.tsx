import { Field } from "solid-form-handler";
import { TextInput } from "@app/components";
import { InputProps } from "./types";

type TimeInputProps = InputProps & {
  name: string;
  label: string;
}

export function TimeInput(props: TimeInputProps) {
  return (
    <Field
      mode="input"
      name={props.name}
      formHandler={props.formHandler}
      render={(field) => (
        <TextInput
          id="date"
          type="time"
          label={props.label}
          errorMessage={field.helpers.errorMessage}
          {...field.props}
        />
      )}
    />
  );
}
