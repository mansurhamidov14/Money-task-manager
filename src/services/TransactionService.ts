import { database, type Database } from "@app/db";
import { Transaction } from "@app/stores";
import { NewTransaction } from "./types";

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
