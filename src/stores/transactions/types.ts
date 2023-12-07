import { CategoryId, CurrencyCode } from "../../constants";

export type TransactionType = "expense" | "income";
export type Transaction = {
  id: string;
  title: string;
  currency: CurrencyCode;
  category: CategoryId;
  type: TransactionType;
  amount: number;
  date: string;
}

export type TransactionsGroup = {
  date: string;
  transactions: Transaction[];
}
