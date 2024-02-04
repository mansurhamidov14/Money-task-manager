import { UserPrivateData } from "@app/adapters/IDB";
import { CurrencyCode } from "@app/constants";
import { Account, Task, Transaction, User } from "@app/stores";

export type CreationRequestData<T> = Omit<T, "id" | "createdAt" | "updatedAt">
export type UserCreationData = UserPrivateData & Omit<User, "id">;
export type NewUser = CreationRequestData<User & UserPrivateData>;
export type NewTransaction = CreationRequestData<Transaction>;
export type NewAccount = CreationRequestData<Account>;
export type NewTask = CreationRequestData<Task>;
export type CurrencyRates = Record<CurrencyCode, number>; 
export type CachedCurrencyRates = {
  [key: string]: CurrencyRates
}

export type CurrencyRatesResponse = {
  from: CurrencyCode;
  to: CurrencyCode;
  result: number;
}[];

export type CachedData = {
  currencyRates: CachedCurrencyRates;
}
