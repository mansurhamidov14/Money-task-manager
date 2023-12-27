import { UserPrivateData } from "@app/adapters/IDB";
import { Account, Transaction, User } from "@app/stores";

export type CreationRequestData<T> = Omit<T, "id" | "createdAt" | "updatedAt">
export type UserCreationData = UserPrivateData & Omit<User, "id">;
export type NewUser = CreationRequestData<User & UserPrivateData>;
export type NewTransaction = CreationRequestData<Transaction>;
export type NewAccount = CreationRequestData<Account>;
