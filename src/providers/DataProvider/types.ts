import { CurrencyCode } from "@app/entities";
import { CategoryId } from "@app/services";
import { User } from "@app/stores"
import { Accessor, Setter } from "solid-js";

export type AsyncDataStatus = "loading" | "success" | "error";
export type AsyncData<T> = {
  status: AsyncDataStatus;
  error?: string;
  data?: T
}

export type Account = {
  id: string;
  userId: User["id"];
  title: string;
  balance: number;
  currency: CurrencyCode;
  skin: string;
  primary: boolean;
  createdAt: number;
  updatedAt: number;
}
export type AccountsData = AsyncData<Account[]>;

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
  transactionDate: string;
  transactionDateTime: string;
  createdAt: number;
  updatedAt: number;
}
export type TransactionsData = AsyncData<Transaction[]>;

export type DataContextType = {
  accounts: Accessor<AccountsData>;
  setAccounts: Setter<AccountsData>;
  resetAccounts: () => void;
  transactionsForMonth: Accessor<TransactionsData>;
  setTransactionsForMonth: Setter<TransactionsData>;
  resetTransactionsForMonth: () => void;
}