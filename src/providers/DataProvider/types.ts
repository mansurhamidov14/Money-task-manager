import { Account } from "@app/entities";
import { AsyncData } from "@app/hooks";
import { Accessor, Setter } from "solid-js";

export type AccountsData = AsyncData<Account[]>;

export type TransactionsData = AsyncData<TransactionsData[]>;

export type DataContextType = {
  accounts: Accessor<AccountsData>;
  setAccounts: Setter<AccountsData>;
  waitForAccountsUpdate: () => void;
  reloadAccounts: () => void;
}