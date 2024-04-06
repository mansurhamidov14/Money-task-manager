import { Transaction } from "@app/entities";
import { memoize } from "@app/helpers";
import { useAsyncData } from "@app/hooks";
import { TransactionFilter, transactionService } from "@app/services";
import { toastStore } from "@app/stores";
import { createEffect } from "solid-js";

export function useTransactions(filter: TransactionFilter) {
  const [
    transactions,
    fetchTransactions,
    setTransactions
  ] = useAsyncData<Transaction[]>();

  const [memoizeTransactionFetch, forgetMemo] = memoize(
    transactionService.getUserTransactions.bind(transactionService)
  );

  createEffect(() => {
    fetchTransactions(() => memoizeTransactionFetch(filter))
  });

  const deleteTransaction = (id: Transaction['id']) => {
    forgetMemo();
    transactionService.delete(id)
      .then(() => setTransactions(state => ({
        status: state.status,
        data: state.data?.filter(t => t.id !== id)
      })))
      .catch(toastStore.handleServerError);
  }

  return { transactions, deleteTransaction };
}