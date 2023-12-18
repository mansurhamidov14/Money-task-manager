import { JSX, Show, mergeProps, splitProps } from "solid-js";
import "./style.css";

export type TextInputProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  | "type"
  | "class"
> & {
  containerClass?: string;
  size?: "sm" | "md" | "lg" | "xl";
  type?: "email" | "text" | "number" | "password";
  label: string;
  addonStart?: JSX.Element
}

export function TextInput(props: TextInputProps) {
  const [localProps, nativeProps] = splitProps(props, [
    "addonStart",
    "type",
    "size",
    "containerClass",
    "label"
  ]);
  const mergedProps = mergeProps({ containerClass: "mb-6", size: "md", type: "text" }, localProps);
  
  return (
    <div class={mergedProps.containerClass}>
      <label
        for={nativeProps.id}
        class="block mb-2 text-sm font-medium"
      >
        {props.label}
      </label>
      <div class="relative">
        <Show when={mergedProps.addonStart}>
          <div class="input-start-addon">
            <div>
              {mergedProps.addonStart}
            </div>
          </div>
        </Show>
        <input
          type={mergedProps.type}
          classList={{ input: true, "has-start-addon": Boolean(mergedProps.addonStart) }}
          {...nativeProps}
        />
      </div>
    </div>
  );
}
