import { Account, Transaction } from "@app/entities";
import { TransactionForm } from "@app/schemas";
import { type HttpService } from "./HttpService";
import { TransactionFilter } from "./types";

export class TransactionService {
  constructor (private httpClient: HttpService) { }

  create(data: TransactionForm) {
    return this.httpClient.post<Transaction, TransactionForm>('/transaction/new', data);
  }

  getById(id: string) {
    return this.httpClient.get<Transaction>(`/transaction/${id}`);
  }

  getUserTransactions = ({ fromDate, toDate, limit, offset }: TransactionFilter) => {
    const endDataObj = toDate ? new Date(toDate) : undefined;
    endDataObj?.setHours(23, 59, 59, 999);
    const params = {
      startDate: fromDate ? new Date(fromDate).toISOString() : undefined,
      endDate: endDataObj?.toISOString(),
      limit,
      offset
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
