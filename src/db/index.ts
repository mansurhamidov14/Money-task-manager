import { Account, Transaction, User } from "@app/stores";
import { IDBAdapter, IDBCollection } from "@app/adapters/IDB";
import structure from "./structure";

export const dbConnection = new IDBAdapter(structure);
export const accountCollection = new IDBCollection<Account>(dbConnection, "accounts");
export const userCollection = new IDBCollection<User>(dbConnection, "users");
export const transactionCollection = new IDBCollection<Transaction>(dbConnection, "transactions");
// @ts-ignore
window.db = dbConnection;