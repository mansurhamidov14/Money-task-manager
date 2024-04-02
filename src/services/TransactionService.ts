import { TransactionForm } from "@app/schemas";
import { Transaction } from "@app/providers/DataProvider/types";
import { Account } from "@app/stores";
import { CategoryId } from "./types";
import { type HttpService } from "./HttpService";

export class TransactionService {
  constructor (private httpClient: HttpService) { }

  create(data: TransactionForm) {
    return this.httpClient.post<Transaction, TransactionForm>('/transaction/new', data);
  }

  getById(id: Transaction["id"]) {
    return this.httpClient.get<Transaction>(`/transaction/${id}`);
  }

  getUserTransactions(startDate?: string, endDate?: string, category?: CategoryId) {
    const endDataObj = endDate ? new Date(endDate) : undefined;
    endDataObj?.setHours(23, 59, 59, 999);
    const params = {
      startDate: startDate ? new Date(startDate).toISOString() : undefined,
      endDate: endDataObj?.toISOString(),
      category
    };
    return this.httpClient.get<Transaction[]>('/transaction/list', { params });
  }

  update(id: Transaction["id"], data: TransactionForm) {
    return this.httpClient.patch<Transaction, TransactionForm>(`/transaction/${id}`, data);
  }

  delete(id: Transaction["id"]) {
    return this.httpClient.delete(`/transaction/${id}`);
  }
  
  deleteByAccountId(accountId: Account["id"]) {
    return this.httpClient.delete(`/by-account/${accountId}`);
  }
}
