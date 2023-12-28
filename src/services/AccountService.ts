import { IDBCollection, SearchCondition } from "@app/adapters/IDB";
import { accountCollection } from "@app/db";
import { Account } from "@app/stores";
import { NewAccount } from "./types";

class AccountService {
  constructor (private collection: IDBCollection<Account>) { }

  create(account: NewAccount) {
    return this.collection.create(account);
  }

  getUserAccounts(user: number) {
    return this.collection.queryAll({ user });
  }

  update(filter: SearchCondition<Account>, data: Partial<Account>) {
    return this.collection.update(filter, data);
  }

  changeBalance(id: number, balanceChange: number) {
    return this.collection.update(id, oldData => ({
      ...oldData,
      balance: oldData.balance + balanceChange
    }));
  }

  delete(id: number) {
    return this.collection.delete(id);
  }

  getById(id: number, user: number) {
    return this.collection.queryOne({ id, user });
  }
}

export const accountService = new AccountService(accountCollection);
