import { createMemo, createRoot, createSignal } from "solid-js";
import { CategoryId } from "@app/constants";
import { Transaction, TransactionsStore } from "./types";
import { DateFilter } from "@app/screens/HistoryScreen/types";
import { RECENT_TRANSACTIONS_MAX_DAYS } from "./constants";
import { sumAmountForTheLastMonth } from "../";
import { transactionService } from "@app/services";

function initTransactionsStore() {
  const [transactions, setTransactions] = createSignal<TransactionsStore>({ status: "loading" });

  const setTransactionsError = (error: string) => setTransactions({ status: "error", error });
  const setTransactionsLoading = () => setTransactions({ status: "loading" });
  const setTransactionsData = (data: Transaction[]) => setTransactions({ status: "success", data });

  const fetchUserTransactions = async (userId: number) => {
    try {
      const userTransactions = await transactionService.getUserTransactions(userId);
      setTransactionsData(userTransactions);
    } catch (e: any) {
      setTransactionsError(e.message);
    }
  }

  const addTransaction = (data: Transaction) => {
    // TODO: add service method adding record to db
    const prevData = transactions().data ?? [];
    setTransactionsData([...prevData, data]);
  }

  const removeTransaction = (id: number) => {
    // TODO: add service method deleting record from db
    setTransactionsData(
      transactions().data!.filter(t => t.id !== id)
    );
  }

  const updateTransaction = (id: number, data: Partial<Transaction>) => {
    // TODO: add service method modifying record in db
    setTransactionsData(
      transactions().data!.map(transaction => {
        if (transaction.id !== id) return transaction;
        return { ...transaction, ...data }
      })
    );
  }

  const descSorter = (a: Transaction, b: Transaction) => a.createdAt > b.createdAt ? -1 : 1;

  const latestTransactions = createMemo(() => {
    if (transactions().status === "loading") {
      return null;
    }
    const now = Date.now();
    const min = now - RECENT_TRANSACTIONS_MAX_DAYS * 86400000;
    const nowDate = new Date(now).toISOString().split('T')[0];
    const minDate = new Date(min).toISOString().split('T')[0];

    const last10daysTransactions = transactions().data!.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt).toISOString().split('T')[0];
      return transactionDate <= nowDate && transactionDate >= minDate;
    });

    return [...last10daysTransactions].sort(descSorter).slice(0, 3);
  });

  const incomeForTheMonth = createMemo(() => {
    if (transactions().status === "loading") {
      return null;
    }
    return sumAmountForTheLastMonth(transactions().data!, "income");
  });

  const expensesForTheMonth = createMemo(() => {
    if (transactions().status === "loading") {
      return null;
    }
    return sumAmountForTheLastMonth(transactions().data!, "expense");
  });

  const getFilteredTransactions = (category: CategoryId | null, dateFilter: DateFilter) => {
    const filteredData = transactions().data!.filter(t => {
      const dateMatches = t.createdAt >= dateFilter.startTimestamp && t.createdAt <= dateFilter.endTimestamp;
      return dateMatches && (category ? t.category === category : true)
    });
    return filteredData.sort(descSorter);
  }

  return {
    transactions,
    latestTransactions,
    getFilteredTransactions,
    addTransaction,
    fetchUserTransactions,
    removeTransaction,
    updateTransaction,
    incomeForTheMonth,
    expensesForTheMonth,
    setTransactionsError,
    setTransactionsLoading,
    setTransactionsData,
  };
}

export const transactionsStore = createRoot(initTransactionsStore);
