import classNames from "classnames";
import { JSX, createMemo, splitProps } from "solid-js";

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  "variant": "primary" | "secondary",
  "size": "sm" | "md" | "lg"
}

export function Button(props: ButtonProps) {
  const [localProps, nativeProps] = splitProps(props, ["class", "variant", "size"]);
  const getClassNames = createMemo(() => {
    return classNames(
      `focus:outline-none font-semibold rounded-lg text-sm uppercase flex justify-center items-center px-5 w-full`,
      localProps.class,
      {
        "h-10": localProps.size === "sm",
        "h-12": localProps.size === "md",
        "h-14": localProps.size === "lg",
        "text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700": localProps.variant === "primary",
        "text-sky-950 bg-secondary-200 hover:bg-secondary-300 dark:bg-secondary-200 dark:hover:bg-secondary-300": localProps.variant === "secondary",
      },
    )
  })
  return (
    <button class={getClassNames()} {...nativeProps}>
      {props.children}
    </button>
  );
}
