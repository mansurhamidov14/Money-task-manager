import { JSX, Show, mergeProps, splitProps } from "solid-js";

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
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <div class="w-4 h-4 text-gray-500 dark:text-gray-400">
              {mergedProps.addonStart}
            </div>
          </div>
        </Show>
        <input
          type={mergedProps.type}
          classList={{
            "bg-white border border-secondary-400 text-sm rounded-lg focus:outline-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-secondary-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-primary-500": true,
            "ps-10": Boolean(mergedProps.addonStart)
          }}
          {...nativeProps}
        />
      </div>
    </div>
  );
}
