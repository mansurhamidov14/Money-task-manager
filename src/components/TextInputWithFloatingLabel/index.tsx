import { JSX, Show, createMemo, mergeProps, splitProps } from "solid-js";

export type TextInputWithFloatingLabelProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  | "type"
  | "class"
  | "id"
> & {
  id: string;
  containerClass?: string;
  type?: "email" | "text" | "number" | "password";
  label: string;
  addonStart?: JSX.Element;
  assistiveText?: string;
  errorMessage?: string | null;
}

export function TextInputWithFloatingLabel(props: TextInputWithFloatingLabelProps) {
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
            "block rounded-t-lg px-2.5 pb-2 pt-6 w-full text-sm font-medium bg-secondary-50 dark:bg-secondary-700 border-0 border-b-2 appearance-none dark:text-white focus:outline-none focus:ring-0 placeholder-transparent focus:placeholder-secondary-400 peer": true,
            "ps-10": Boolean(localProps.addonStart),
            "border-secondary-200 dark:border-secondary-600 dark:focus:border-primary-500 focus:border-primary-600": !hasError(),
            "border-red-600 dark:border-red-400": hasError()
          }}
          {...nativeProps}
        />
        <Show when={localProps.addonStart}>
          <div classList={{
            "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none": true,
            "text-secondary-500 dark:text-secondary-400 peer-focus:text-primary-500 dark:peer-focus:text-primary-400": !hasError(),
            "text-red-700 dark:text-red-400": hasError()
          }}>
            <div class="w-4 h-4">
              {localProps.addonStart}
            </div>
          </div>
        </Show>
        <label
          for={nativeProps.id}
          classList={{
            "absolute start-2.5 text-sm font-medium text-secondary-500 dark:text-secondary-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto": true,
            "ps-10 peer-placeholder-shown:ps-8 peer-focus:ps-10": Boolean(localProps.addonStart),
            "peer-focus:text-primary-500 peer-focus:dark:text-primary-400": !hasError(),
            "peer-focus:text-red-700 peer-focus:dark:text-red-400": hasError(),
          }}
        >
          {props.label}
        </label>
      </div>
      <Show when={localProps.errorMessage}>
        <p class="mt-1 text-xs text-red-600 dark:text-red-400">{localProps.errorMessage}</p>
      </Show>
      <Show when={localProps.assistiveText}>
        <p id={`assistiveText-${props.id}`} class="mt-2 text-xs text-secondary-500 dark:text-secondary-400">
          {localProps.assistiveText}
        </p>
      </Show>
    </div>
  );
}
