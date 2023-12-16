import classNames from "classnames";
import { JSX, createMemo, splitProps } from "solid-js";

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "secondary" | "glass",
  size: "sm" | "md" | "lg",
  full?: boolean
}

export function Button(props: ButtonProps) {
  const [localProps, nativeProps] = splitProps(props, ["class", "full", "variant", "size"]);
  const getClassNames = createMemo(() => {
    return classNames(
      `focus:outline-none font-semibold rounded-lg text-sm uppercase flex justify-center items-center px-1.5`,
      localProps.class,
      {
        "w-full": localProps.full,
        "h-8": localProps.size === "sm",
        "h-10": localProps.size === "md",
        "h-12": localProps.size === "lg",
        "text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700": localProps.variant === "primary",
        "text-sky-950 bg-secondary-200 hover:bg-secondary-300 dark:bg-secondary-200 dark:hover:bg-secondary-300": localProps.variant === "secondary",
        "dark:text-secondary-200 inline-flex items-center dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700": localProps.variant === "glass",
      },
    )
  })
  return (
    <button class={getClassNames()} {...nativeProps}>
      {props.children}
    </button>
  );
}
