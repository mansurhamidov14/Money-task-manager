import classNames from "classnames";
import { JSX, ParentProps, Show, createMemo, mergeProps, splitProps } from "solid-js";
import "./style.css";

export type SelectProps = Omit<
  JSX.SelectHTMLAttributes<HTMLSelectElement>,
  | "class"
  | "id"
> & {
  id: string;
  containerClass?: string;
  label: string;
  addonStart?: JSX.Element;
  assistiveText?: string;
  errorMessage?: string | null;
}

export function Select(props: ParentProps<SelectProps>) {
  const mergedProps = mergeProps({
    size: "md"
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
    <div class={classNames("relative mb-5", localProps.containerClass)}>
      <div class="relative">
        <select
          aria-describedby={localProps.assistiveText && `assistiveText-${props.id}`}
          classList={{
            "flselect peer": true,
            "has-start-addon": Boolean(localProps.addonStart),
            "has-error": hasError()
          }}
          {...nativeProps}
        />
        <Show when={localProps.addonStart}>
          <div classList={{ "flselect-start-addon": true, "has-error": hasError() }}>
            <div class="w-4 h-4">
              {localProps.addonStart}
            </div>
          </div>
        </Show>
        <label for={nativeProps.id}>{localProps.label}</label>
      </div>
      <Show when={localProps.errorMessage}>
        <p class="flselect-error">{localProps.errorMessage}</p>
      </Show>
      <Show when={localProps.assistiveText}>
        <p id={`assistiveText-${props.id}`} class="fl-select-help">
          {localProps.assistiveText}
        </p>
      </Show>
    </div>
  );
}
