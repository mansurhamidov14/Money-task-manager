import { CurrencyCode, currencies } from "@app/constants";
import { JSXElement, Show } from "solid-js";

export type TransactionGroupProps = {
  date: string;
  amount: null | number,
  currency: CurrencyCode;
  children: JSXElement | JSXElement[];
}

export function TransactionGroup(props: TransactionGroupProps) {
  return (
    <div class="flex flex-col gap-3">
      <div class="flex justify-between items-end">
        <div class="text-secondary-500 dark:text-secondary-300 font-medium mt-1">{props.date}</div>
        <Show when={props.amount}>
          <div classList={{
            "rounded-lg font-medium px-2 py-0.5 mr-1 text-xs": true,
            "bg-rose-500/10 text-rose-500/70": props.amount! < 0,
            "bg-teal-500/10 text-teal-500/70": props.amount! > 0,
            "bg-amber-500/10 text-amber-500/70": props.amount === 0
            }}>
              {`${props.amount! < 0 ? "-" : ""}${currencies[props.currency].formatter(props.amount!)}`}
          </div>
        </Show>
      </div>
      {props.children}
    </div>
  );
}
