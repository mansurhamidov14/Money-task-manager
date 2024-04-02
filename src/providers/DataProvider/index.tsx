import { accountService, transactionService } from "@app/services";
import { createContext, createEffect, ParentProps } from "solid-js";
import {tasksStore, user } from "../../stores";
import { Account, DataContextType, Transaction } from "./types";
import { useAsyncData } from "./hooks";

export const DataContext = createContext<DataContextType>();

export function DataProvider(props: ParentProps) {
  const userId = user.currentUser().data!.id;
  const [
    accounts,
    fetchAccounts,
    setAccounts,
    resetAccounts
  ] = useAsyncData<Account[]>();
  const [
    transactionsForMonth,
    fetchTransactionsForMonth,
    setTransactionsForMonth,
    resetTransactionsForMonth
  ] = useAsyncData<Transaction[]>();

  createEffect(() => {
    if (accounts().status === "loading") {
      fetchAccounts(accountService.getUserAccounts)
    }
  });

  createEffect(() => {
    if (transactionsForMonth().status === "loading") {
      fetchTransactionsForMonth(transactionService.getUserTransactions);
    }
  });

  createEffect(async () => {
    if (tasksStore.tasks().status === "loading") {
      await tasksStore.fetchUserTasks(userId);
    }
  });

  return (
    <DataContext.Provider value={{
      accounts,
      setAccounts,
      resetAccounts,
      transactionsForMonth,
      setTransactionsForMonth,
      resetTransactionsForMonth
    }}>
      {props.children}
    </DataContext.Provider>
  );
}