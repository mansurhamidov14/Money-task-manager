import { createMemo } from "solid-js";
import {
  Categories,
  CategoryId,
  CurrencyCode,
  currencies
} from "@app/constants";
import { Message } from "@app/i18n";
import { Transaction } from "@app/stores";

export type TransactionListItemProps = {
  category: CategoryId;
  title: string;
  amount: number;
  currency: CurrencyCode;
  transactionType: "expense" | "income";
  date: string;
}

function getTransactionValue(
  amount: number,
  currency: CurrencyCode,
  transactionType: TransactionListItemProps["transactionType"]
) {
  return `${(transactionType === "expense" ? "-" : "+")}${currencies[currency].formatter(amount)}`;
}

export function TransactionListItem(props: Transaction) {
  const categoryIcon = createMemo(() => {
    const Icon = Categories[props.category].icon;
    return <Icon />;
  });
  
  return (
    <a href="#">
      <div class="bg-white dark:bg-gray-700 shadow rounded-lg pl-3 pr-6 py-4">
        <div class="flex font-medium justify-between gap-3">
          <div
            style={{
              "background-color": Categories[props.category].colors.accent,
              "color": Categories[props.category].colors.icon
            }}
            class="rounded-lg flex justify-center items-center aspect-square h-12 text-3xl"
          >
            {categoryIcon()}
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-medium text-ellipsis overflow-hidden whitespace-nowrap">
              {props.title}
            </div>
            <div class="text-secondary-400 dark:text-secondary-300 font-normal text-sm mt-1">
              <Message>{`Category.${props.category}`}</Message>
            </div>
          </div>
          <div class="text-right">
            <div class={`text font-bold text-${props.type}`}>
              {getTransactionValue(props.amount, props.currency, props.type)}
            </div>
            <div class="text-secondary-400 dark:text-secondary-300 text-xs mt-1.5">
              {new Date(props.createdAt).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
