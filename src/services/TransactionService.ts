import { type IDBCollection, SearchCondition } from "@app/adapters/IDB";
import { Account, Transaction } from "@app/stores";
import { NewTransaction } from "./types";

export class TransactionService {
  constructor (private collection: IDBCollection<Transaction>) { }

  create(transaction: NewTransaction) {
    return this.collection.create(transaction);
  }

  getById(id: number) {
    return this.collection.queryOne(id);
  }

  getUserTransactions(user: string) {
    return this.collection.queryAll({ user });
  }

  update(id: SearchCondition<Transaction>, data: Partial<Transaction>) {
    return this.collection.update(id, data);
  }

  delete(id: number) {
    return this.collection.delete(id);
  }

  deleteByAccountId(account: Account['id']) {
    return this.collection.delete({ account });
  }
}
