import { CategoryId } from "@app/services";
import { AsyncStore } from "../types";
import type { Currency, CurrencyCode } from "@app/entities";

export type TransactionType = "expense" | "income";
export type Transaction = {
  id: number;
  account: string;
  user: string; 
  title: string;
  currency: CurrencyCode;
  category: CategoryId;
  type: TransactionType;
  amount: number;
  transactionDate: string;
  transactionDateTime: string;
  createdAt: number;
  updatedAt: number;
}

export type TransactionGroupSum = {
  currency: Currency;
  amount: number;
}

export type TransactionsStore = AsyncStore<Transaction[]>;
