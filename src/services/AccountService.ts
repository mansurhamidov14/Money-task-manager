import { IDBCollection, SearchCondition } from "@app/adapters/IDB";
import { accountCollection } from "@app/db";
import { Account } from "@app/stores";
import { NewAccount } from "./types";

class AccountService {
  constructor (private collection: IDBCollection<Account>) { }

  create(account: NewAccount) {
    return this.collection.create(account);
  }

  getUserAccounts(userId: number) {
    return this.collection.queryAll(["user", userId]);
  }

  update(id: SearchCondition, data: Partial<Account>) {
    return this.collection.update(id, data);
  }

  delete(id: number) {
    return this.collection.delete(id);
  }
}

export const accountService = new AccountService(accountCollection);
