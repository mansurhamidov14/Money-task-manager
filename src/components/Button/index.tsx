import classNames from "classnames";
import { JSX, splitProps } from "solid-js";

import"./style.css";

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "secondary" | "glass",
  size: "sm" | "md" | "lg",
  full?: boolean;
}

export function Button(props: ButtonProps) {
  const [localProps, nativeProps] = splitProps(props, ["class", "full", "variant", "size"]);

  return (
    <button
      class={classNames(localProps.class, `btn btn-${props.size} btn-${props.variant}`, props.full && 'btn-full')}
      {...nativeProps}
    >
      {props.children}
    </button>
  );
}
