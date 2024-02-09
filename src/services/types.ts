import { UserPrivateData } from "@app/adapters/IDB";
import { Account, Task, Transaction, User } from "@app/stores";
import { IconTypes } from "solid-icons";

export type CreationRequestData<T> = Omit<T, "id" | "createdAt" | "updatedAt">
export type UserCreationData = UserPrivateData & Omit<User, "id">;
export type NewUser = CreationRequestData<User & UserPrivateData>;
export type NewTransaction = CreationRequestData<Transaction>;
export type NewAccount = CreationRequestData<Account>;
export type NewTask = CreationRequestData<Task>;

export enum CurrencyCode {
  AZN = "AZN",
  GBP = "GBP",
  USD = "USD",
  UAH = "UAH",
  RUB = "RUB",
  TRY = "TRY",
  EUR = "EUR",
};

export type Currency = {
  code: CurrencyCode;
  sign: string;
  precision: number;
  formatter: (value: number) => string;
  flag: string;
}

export type Currencies = Record<CurrencyCode, Currency>;

export type CurrencyRates = Record<CurrencyCode, number>; 

export type CachedCurrencyRates = {
  [key: string]: Partial<CurrencyRates>
}

export type CurrencyRatesResponse = {
  from: CurrencyCode;
  to: CurrencyCode;
  result: number;
}[];

export type CachedData = {
  currencyRates: CachedCurrencyRates;
}

export type ClientDataResponse = {
  ip: string;
  currency: CurrencyCode;
  country_code: string;
  country_name: string;
  city: string;
  timezone: string;
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
