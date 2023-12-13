import { JSXElement, Show } from "solid-js";

export type AmountCardContentProps = {
  label: string;
  icon: JSXElement;
  loading: () => boolean;
  amount: () => string;
}

export function AmountCardContent(props: AmountCardContentProps) {
  return (
    <div class="flex justify-between items-center pt-2 pb-3 px-3 text-white gap-3">
      <div>
        <div class="text-sm">{props.label}</div>
        <Show
          when={!props.loading()}
          fallback={<div class="bg-gray-50/25 rounded-md h-5 w-[52px] animate-pulse mt-3" />}
        >
          <div class="mt-1 text-xl font-semibold">{props.amount()}</div>
        </Show>
      </div>
      <div class="mt-1 text-3xl pr-4">{props.icon}</div>
    </div>
  );
}