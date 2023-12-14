import { Transaction, User } from "@app/stores";
import { IDBAdapter, IDBCollection } from "@app/adapters/IDB";
import structure from "./structure";

export const dbConnection = new IDBAdapter(structure);
export const userCollection = new IDBCollection<User>(dbConnection, "users");
export const transactionCollection = new IDBCollection<Transaction>(dbConnection, "transactions");

if (import.meta.env.MODE === "development") {
  (window as any).db = dbConnection;
};
