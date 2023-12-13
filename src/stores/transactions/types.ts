import { CategoryId, CurrencyCode } from "../../constants";
import { AsyncStore } from "../types";

export type TransactionType = "expense" | "income";
export type Transaction = {
  id: number;
  user: number; 
  title: string;
  currency: CurrencyCode;
  category: CategoryId;
  type: TransactionType;
  amount: number;
  createdAt: number;
}

export type TransactionsGroup = {
  date: string;
  transactions: Transaction[];
}

export type TransactionsStore = AsyncStore<Transaction[]>;
