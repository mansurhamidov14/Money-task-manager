import { Account, Transaction, User } from "@app/stores";

export type CreationRequestData<T> = Omit<T, "id" | "createdAt" | "updatedAt">

export type UserDbData = {
  password: string;
  pinCode?: string;
} & Omit<User, "id">;

export type NewTransaction = CreationRequestData<Transaction>;
export type NewAccount = CreationRequestData<Account>;
