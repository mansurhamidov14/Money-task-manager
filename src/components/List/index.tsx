import { JSXElement, mergeProps } from "solid-js";
import "./style.css"

export type TransactionListGroupProps = {
  children: JSXElement | JSXElement[];
  itemsGap?: "sm" | "md" | "lg"
}

export function List(_props: TransactionListGroupProps) {
  const props = mergeProps({ gap: "md" }, _props);
  return (
    <div class={`wfo-list gap-${props.gap}`}>
      {props.children}
    </div>
  );
}
