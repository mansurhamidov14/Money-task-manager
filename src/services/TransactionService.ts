import { database, type Database } from "@app/db";
import { Transaction } from "@app/stores";
import { NewTransaction } from "./types";

class TransactionService {
  private collection = "transactions";
  constructor (private database: Database) { }

  create(transaction: NewTransaction): Promise<Transaction> {
    return this.database.create<NewTransaction>(this.collection, transaction);
  }

  getUserTransactions(userId: number): Promise<Transaction[]> {
    return this.database.queryAll<Transaction>(this.collection, ["user", userId]);
  }

  updateTransaction(id: number, data: Partial<Transaction>) {
    return this.database.update(this.collection, id, data);
  }

  deleteTransaction(id: number) {
    return this.database.delete(this.collection, id);
  }
}

export const transactionService = new TransactionService(database);
