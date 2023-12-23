import { Account, Transaction, User } from "@app/stores";

export type CreationRequestData<T> = Omit<T, "id" | "createdAt" | "updatedAt">

export type RegisterUser = {
  password: string;
} & Omit<User, "id">;

export type NewTransaction = CreationRequestData<Transaction>;
export type NewAccount = CreationRequestData<Account>;
