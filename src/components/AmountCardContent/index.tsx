import { JSXElement } from "solid-js";

export type AmountCardContentProps = {
  label: string;
  icon: JSXElement;
  amount: string;
}

export function AmountCardContent(props: AmountCardContentProps) {
  return (
    <div class="flex justify-between items-center pt-2 pb-3 px-3 text-white gap-3">
      <div>
        <div class="text-sm">{props.label}</div>
        <div class="mt-1 text-xl font-semibold">{props.amount}</div>
      </div>
      <div class="mt-1 text-3xl pr-4">{props.icon}</div>
    </div>
  );
}