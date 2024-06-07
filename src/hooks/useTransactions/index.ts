import { Transaction } from "@app/entities";
import { memoize } from "@app/helpers";
import { useAsyncData } from "@app/hooks";
import { TransactionFilter, transactionService } from "@app/services";
import { toastStore } from "@app/stores";
import { Accessor, createEffect } from "solid-js";

export function useTransactions(filter: Accessor<TransactionFilter>) {
  const [
    transactions,
    fetchTransactions,
    ,
    reloadTransactions,
    waitForTransactionsUpdate
  ] = useAsyncData<Transaction[]>();

  const [memoizeTransactionFetch, forgetMemo] = memoize(
    transactionService.getUserTransactions
  );

  createEffect(() => {
    if (transactions().status === "initial") {
      fetchTransactions(() => memoizeTransactionFetch(filter()))
    }
  });

  createEffect(() => {
    if (filter()) {
      reloadTransactions();
    }
  });

  const deleteTransaction = (id: Transaction['id']) => {
    forgetMemo();
    waitForTransactionsUpdate();
    transactionService.delete(id)
      .then(() => reloadTransactions())
      .catch(toastStore.handleServerError);
  }

  return { transactions, deleteTransaction };
}