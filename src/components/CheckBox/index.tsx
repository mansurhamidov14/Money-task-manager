import classNames from "classnames";
import { JSX, splitProps } from "solid-js";
import "./style.css";

export type CheckBoxProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
}

export function CheckBox(props: CheckBoxProps) {
  const [localProps, nativeProps] = splitProps(props, ["class", "label"]);
  return (
    <div class="flex items-center">
      <input {...nativeProps} type="checkbox" class={classNames("checkbox", localProps.class)} />
      <label for={nativeProps.id} class="ms-2 text-sm font-medium">
        {localProps.label}
      </label>
    </div>
  )
}