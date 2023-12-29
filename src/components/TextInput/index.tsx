import { JSX, Show, createMemo, mergeProps, splitProps } from "solid-js";
import "./style.css";

export type TextInputProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  | "type"
  | "class"
  | "id"
> & {
  id: string;
  containerClass?: string;
  type?: "email" | "text" | "number" | "password" | "date" | "time" | "datetime-local";
  label: string;
  addonStart?: JSX.Element;
  assistiveText?: string;
  errorMessage?: string | null;
}

export function TextInput(props: TextInputProps) {
  const mergedProps = mergeProps({
    placeholder: " ",
    size: "md",
    type: "text"
  }, props);

  const [localProps, nativeProps] = splitProps(mergedProps, [
    "addonStart",
    "assistiveText",
    "containerClass",
    "label",
    "errorMessage"
  ]);

  const hasError = createMemo(() => Boolean(localProps.errorMessage));
  
  return (
    <div class={localProps.containerClass}>
      <div class="relative">
        <input
          aria-describedby={localProps.assistiveText && `assistiveText-${props.id}`}
          classList={{
            inputfl: true,
            "has-start-addon": Boolean(localProps.addonStart),
            "has-error": hasError(),
            "filled": !nativeProps.value
          }}
          {...nativeProps}
        />
        <Show when={localProps.addonStart}>
          <div classList={{ "inputfl-start-addon": true, "has-error": hasError() }}>
            <div class="w-4 h-4">
              {localProps.addonStart}
            </div>
          </div>
        </Show>
        <label for={nativeProps.id}>
          {props.label}
        </label>
      </div>
      <Show when={localProps.errorMessage}>
        <p class="inputfl-error">{localProps.errorMessage}</p>
      </Show>
      <Show when={localProps.assistiveText}>
        <p id={`assistiveText-${props.id}`} class="inputfl-help">
          {localProps.assistiveText}
        </p>
      </Show>
    </div>
  );
}
