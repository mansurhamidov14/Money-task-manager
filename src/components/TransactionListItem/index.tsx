import { createMemo } from "solid-js";
import {
  Categories,
  CategoryId,
  CurrencyCode,
  currencies
} from "@app/constants";
import { Message } from "@app/i18n";
import { Transaction } from "@app/stores";
import { ListItem } from "../ListItem";

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
    return <Icon size={28} />;
  });
  
  return (
    <ListItem
      size="lg"
      icon={(
        <div
          class="h-full flex justify-center items-center"
          style={{
            "background-color": Categories[props.category].colors.accent,
            "color": Categories[props.category].colors.icon
          }}
        >
          {categoryIcon()}
        </div>
      )}
      title={props.title}
      description={<Message>{`Category.${props.category}`}</Message>}
      rightElement={(
        <>
          <div class={`text font-bold text-${props.type}`}>
            {getTransactionValue(props.amount, props.currency, props.type)}
          </div>
          <div class="text-secondary-400 dark:text-secondary-300 text-xs mt-1.5">
            {new Date(props.transactionDateTime).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
          </div>
        </>
      )}
    />
  );
}
