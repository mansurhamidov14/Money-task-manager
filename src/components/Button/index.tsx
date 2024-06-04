import classNames from "classnames";
import { JSX, mergeProps, splitProps } from "solid-js";

import { Loading } from "../Loading";
import "./style.css";

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  preserveCase?: boolean;
  variant?: "primary" | "secondary" | "transparent" | "danger" | "success" | "ghost",
  size?: "xs" | "sm" | "md" | "lg",
  full?: boolean;
  square?: boolean;
  loading?: boolean;
}

export function Button(props: ButtonProps) {
  const [_localProps, nativeProps] = splitProps(props, [
    "disabled",
    "class",
    "full",
    "variant",
    "size",
    "square",
    "preserveCase",
    "loading",
    "children",
  ]);
  const localProps = mergeProps({ size: "md", variant: "primary" }, _localProps);

  return (
    <button
      class={classNames(
        localProps.class,
        `btn btn-${localProps.size}
        btn-${localProps.variant}`,
        localProps.full && 'btn-full',
        localProps.square && 'btn-square',
        !localProps.preserveCase && 'uppercase',
        localProps.loading && 'loading',
        (localProps.disabled || localProps.loading) && 'disabled',
      )}
      disabled={localProps.disabled || localProps.loading}
      {...nativeProps}
    >
      {localProps.loading ? <Loading /> : localProps.children}
    </button>
  );
}
