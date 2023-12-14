import { IDBCollection } from "@app/adapters/IDB";
import { transactionCollection } from "@app/db";
import { Transaction } from "@app/stores";
import { NewTransaction } from "./types";

class TransactionService {
  constructor (private collection: IDBCollection<Transaction>) { }

  create(transaction: NewTransaction) {
    return this.collection.create(transaction);
  }

  getUserTransactions(userId: number) {
    return this.collection.queryAll(["user", userId]);
  }

  updateTransaction(id: number, data: Partial<Transaction>) {
    return this.collection.update(id, data);
  }

  deleteTransaction(id: number) {
    return this.collection.delete(id);
  }
}

export const transactionService = new TransactionService(transactionCollection);
