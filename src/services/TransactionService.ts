import { IDBCollection, SearchCondition } from "@app/adapters/IDB";
import { transactionCollection } from "@app/db";
import { Transaction } from "@app/stores";
import { NewTransaction } from "./types";

class TransactionService {
  constructor (private collection: IDBCollection<Transaction>) { }

  create(transaction: NewTransaction) {
    return this.collection.create(transaction);
  }

  getById(id: number) {
    return this.collection.queryOne(id);
  }

  getUserTransactions(user: number) {
    return this.collection.queryAll({ user });
  }

  update(id: SearchCondition<Transaction>, data: Partial<Transaction>) {
    return this.collection.update(id, data);
  }

  delete(id: number) {
    return this.collection.delete(id);
  }

  deleteByAccountId(account: number) {
    return this.collection.delete({ account });
  }
}

export const transactionService = new TransactionService(transactionCollection);
