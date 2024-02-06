import { CategoryId, Currency, type CurrencyCode } from "@app/services";
import { AsyncStore } from "../types";

export type TransactionType = "expense" | "income";
export type Transaction = {
  id: number;
  account: number;
  user: number; 
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
  formatter: Currency["formatter"];
  amount: number;
}

export type TransactionsStore = AsyncStore<Transaction[]>;
