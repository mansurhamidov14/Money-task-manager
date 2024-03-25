import { Account } from "@app/stores";
import type { HttpService } from "./HttpService";
import { AccountForm } from "@app/schemas";

export class AccountService {
  constructor (private httpClient: HttpService) {}

  create(data: AccountForm) {
    return this.httpClient.post<Account, AccountForm>('/account/new', data);
  }

  getUserAccounts() {
    return this.httpClient.get<Account[]>('/account/list');
  }

  getById(id: string) {
    return this.httpClient.get<Account>(`/account/${id}`);
  }

  update(id: string, data: AccountForm) {
    return this.httpClient.patch<boolean, AccountForm>(`/account/${id}`, data);
  }

  changeBalance(id: string, balanceChange: number) {
    return this.httpClient.patch<boolean, { difference: number}>(
      `/account/change-balance/${id}`,
      { difference: balanceChange}
    )
  }

  delete(id: string) {
    return this.httpClient.delete<boolean>(`/account/${id}`);
  }
}

