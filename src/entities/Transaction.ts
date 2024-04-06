import { IconTypes } from "solid-icons";
import type { Currency, CurrencyCode } from ".";
import { Account } from "./Account";

export type TransactionType = "expense" | "income";
export type Transaction = {
  id: string;
  account: Pick<Account, "id" | "currency">;
  user: string; 
  title: string;
  currency: CurrencyCode;
  category: CategoryId;
  type: TransactionType;
  amount: number;
  transactionDateTime: string;
  createdAt: number;
  updatedAt: number;
}

export type CategoryId =
  | "market"
  | "utility"
  | "education"
  | "entertainment"
  | "health"
  | "beauty"
  | "clothing"
  | "electronics"
  | "restaurant"
  | "transfer"
  | "transport"
  | "travel"
  | "gift"
  | "transferBetweenAccounts"
  | "other";

export type Category = {
  id: CategoryId,
  icon: IconTypes,
  colors: {
    accent: string;
    icon: string;
  }
}

export type TransactionGroupSum = {
  currency: Currency;
  amount: number;
}