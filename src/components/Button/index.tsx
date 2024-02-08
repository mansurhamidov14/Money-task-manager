import classNames from "classnames";
import { JSX, mergeProps, splitProps } from "solid-js";

import"./style.css";

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  preserveCase?: boolean;
  variant?: "primary" | "secondary" | "transparent" | "danger" | "success" | "ghost",
  size?: "xs" | "sm" | "md" | "lg",
  full?: boolean;
  square?: boolean;
}

export function Button(props: ButtonProps) {
  const [_localProps, nativeProps] = splitProps(props, ["class", "full", "variant", "size", "square", "preserveCase"]);
  const localProps = mergeProps({ size: "md", variant: "primary" }, _localProps)

  return (
    <button
      class={classNames(
        localProps.class,
        `btn btn-${localProps.size}
        btn-${localProps.variant}`,
        localProps.full && 'btn-full',
        localProps.square && 'btn-square',
        !localProps.preserveCase && 'uppercase'
      )}
      {...nativeProps}
    />
  );
}
