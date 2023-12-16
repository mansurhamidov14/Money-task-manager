import { JSXElement } from "solid-js";

export type TransactionListGroupProps = {
  children: JSXElement | JSXElement[];
}

export function TransactionList(props: TransactionListGroupProps) {
  return (
    <div class="flex flex-col gap-4">
      {props.children}
    </div>
  );
}
