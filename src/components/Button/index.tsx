import classNames from "classnames";
import { JSX, mergeProps, splitProps } from "solid-js";

import"./style.css";

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "glass",
  size?: "sm" | "md" | "lg",
  full?: boolean;
  square?: boolean;
}

export function Button(props: ButtonProps) {
  const [_localProps, nativeProps] = splitProps(props, ["class", "full", "variant", "size"]);
  const localProps = mergeProps({ size: "md", variant: "primary" }, _localProps)

  return (
    <button
      class={classNames(
        localProps.class,
        `btn btn-${props.size}
        btn-${props.variant}`,
        props.full && 'btn-full',
        props.square && 'btn-square'
      )}
      {...nativeProps}
    >
      {props.children}
    </button>
  );
}
