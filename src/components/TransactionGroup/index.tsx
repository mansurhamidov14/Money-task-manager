import { TransactionGroupSum } from "@app/stores";
import { For, JSXElement, Show } from "solid-js";

export type TransactionGroupProps = {
  date: string;
  amounts?: TransactionGroupSum[];
  children: JSXElement | JSXElement[];
}

export function TransactionGroup(props: TransactionGroupProps) {
  return (
    <div class="flex flex-col gap-3">
      <div class="flex justify-between items-end">
        <div class="text-muted font-medium mt-1">{props.date}</div>
        <Show when={props.amounts}>
          <div class="flex gap-1">
            <For each={props.amounts}>
              {group => (
                <div classList={{
                  "rounded-lg font-medium px-2 py-0.5 mr-1 text-xs": true,
                  "bg-rose-500/10 text-rose-500/70": group.amount < 0,
                  "bg-teal-500/10 text-teal-500/70": group.amount > 0,
                  "bg-amber-500/10 text-amber-500/70": group.amount === 0
                  }}>
                    {`${group.formatter(group.amount)}`}
                </div>
              )}
            </For>
          </div>
          
        </Show>
      </div>
      {props.children}
    </div>
  );
}
