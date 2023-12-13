import { NewTransaction } from "./types";
import { database, type Database } from "../db";
import { Transaction } from "../stores";

class TransactionService {
  constructor (private database: Database) { }

  create(transaction: NewTransaction): Promise<Transaction> {
    return this.database.create<NewTransaction>("transactions", transaction);
  }

  getUserTransactions(userId: number): Promise<Transaction[]> {
    return this.database.queryAll<Transaction>("transactions", ["user", userId]);
  }
}

export const transactionService = new TransactionService(database);
