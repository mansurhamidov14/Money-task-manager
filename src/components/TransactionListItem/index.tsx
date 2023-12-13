import {
  Categories,
  CategoryId,
  CurrencyCode,
  currencies
} from "../../constants";
import { Message } from "../../i18n/components";
import { Transaction } from "../../stores";

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

export function TransactionListItem({
  category,
  currency,
  title,
  amount,
  type,
  createdAt
}: Transaction) {
  const Category = Categories[category];
  return (
    <a href="#">
      <div class="bg-white shadow rounded-lg pl-3 pr-6 py-4">
        <div class="flex font-medium justify-between gap-3">
          <div
            style={{
              "background-color": Category.colors.accent,
              "color": Category.colors.icon
            }}
            class="rounded-lg flex justify-center items-center aspect-square h-12 text-3xl"
          >
            <Category.Icon />
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-medium text-ellipsis overflow-hidden whitespace-nowrap">
              {title}
            </div>
            <div class="text-secondary-400 font-normal text-sm mt-1">
              <Message>{`Category.${category}`}</Message>
            </div>
          </div>
          <div class="text-right">
            <div class={`text font-bold text-${type}`}>
              {getTransactionValue(amount, currency, type)}
            </div>
            <div class="text-secondary-400 text-xs mt-1.5">
              {new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
