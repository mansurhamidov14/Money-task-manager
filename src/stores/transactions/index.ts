import { createMemo, createRoot, createSignal } from "solid-js";
import { CategoryId, CurrencyCode } from "@app/constants";
import { Transaction, TransactionsStore } from "./types";
import { DateFilter } from "@app/screens/HistoryScreen/types";
import { RECENT_TRANSACTIONS_MAX_DAYS } from "./constants";
import { transactionService } from "@app/services";
import { descSorter } from "..";

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

  const deleteTransaction = async (id: number) => {
    await transactionService.delete(id);
    setTransactionsData(
      transactions().data!.filter(t => t.id !== id)
    );
  }

  const deleteByAccountId = async (account: number) => {
    await transactionService.deleteByAccountId(account);
    setTransactionsData(
      transactions().data!.filter(t => t.account !== account)
    );
  }

  const updateTransaction = async (id: number, data: Partial<Transaction>) => {
    await transactionService.update(id, data);
    setTransactionsData(
      transactions().data!.map(transaction => {
        if (transaction.id !== id) return transaction;
        return { ...transaction, ...data }
      })
    );
  }

  const latestTransactions = createMemo(() => {
    if (transactions().status === "loading") {
      return null;
    }
    const now = Date.now();
    const min = now - RECENT_TRANSACTIONS_MAX_DAYS * 86400000;
    const nowDate = new Date(now).toDatePickerString();
    const minDate = new Date(min).toDatePickerString();

    const last10daysTransactions = transactions().data!.filter(({ transactionDate }) => {
      return transactionDate <= nowDate && transactionDate >= minDate;
    });

    return last10daysTransactions.sort(descSorter).slice(0, 3);
  });

  const getFilteredTransactions = (category: CategoryId | null, dateFilter: DateFilter) => {
    const filteredData = transactions().data!.filter(t => {
      const dateMatches = t.transactionDate >= dateFilter.startDate && t.transactionDate <= dateFilter.endDate;
      return dateMatches && (category ? t.category === category : true)
    });
    return filteredData.toSorted(descSorter);
  }

  const updateCurrencyByAccount = async (user: number, account: number, currency: CurrencyCode) => {
    await transactionService.update({ account, user }, { currency });
    setTransactionsData(transactions().data!.map(transaction => {
      if (transaction.account !== account) return transaction;
      return { ...transaction, currency };
    }));
  }

  return {
    transactions,
    latestTransactions,
    getFilteredTransactions,
    addTransaction,
    fetchUserTransactions,
    deleteTransaction,
    deleteByAccountId,
    updateTransaction,
    setTransactionsError,
    setTransactionsLoading,
    setTransactionsData,
    updateCurrencyByAccount
  };
}

export const transactionsStore = createRoot(initTransactionsStore);
