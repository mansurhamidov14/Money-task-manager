import { createMemo, createRoot, createSignal } from "solid-js";
import { CategoryId, CurrencyCode } from "@app/constants";
import { Transaction, TransactionsStore } from "./types";
import { DateFilter } from "@app/screens/HistoryScreen/types";
import { RECENT_TRANSACTIONS_MAX_DAYS } from "./constants";

export const mockTransactions: Omit<Transaction, "id">[] = [
  {
    user: 2,
    title: "Maaş",
    createdAt: new Date("2023-11-30T10:37:24.803Z").getTime(),
    category: "transfer",
    currency: CurrencyCode.USD,
    type: "income",
    amount: 2500
  },
  {
    user: 2,
    title: "Vergilər",
    createdAt: new Date("2023-12-02T12:37:24.803Z").getTime(),
    category: "transfer",
    currency: CurrencyCode.USD,
    type: "expense",
    amount: 120
  },
  {
    user: 2,
    title: "Evə bazarlıq",
    createdAt: new Date("2023-12-03T17:42:24.803Z").getTime(),
    category: "market",
    currency: CurrencyCode.USD,
    type: "expense",
    amount: 70
  },
  {
    user: 2,
    title: "Qış ayaqqabısı",
    createdAt: new Date("2023-12-02T17:42:24.803Z").getTime(),
    category: "clothing",
    currency: CurrencyCode.USD,
    type: "expense",
    amount: 60
  },
  {
    user: 2,
    title: "PS çırpırıq manslar",
    createdAt: new Date("2023-11-29T17:42:24.803Z").getTime(),
    category: "entertainment",
    currency: CurrencyCode.USD,
    type: "expense",
    amount: 60
  },
  {
    user: 2,
    title: "Üregim tutdu, aptekə qaçdım",
    createdAt: new Date("2023-12-05T17:42:24.803Z").getTime(),
    category: "health",
    currency: CurrencyCode.USD,
    type: "expense",
    amount: 3.2
  },
];

function initTransactionsStore() {
  const [transactionsStore, setTransactionsStore] = createSignal<TransactionsStore>({
    isLoading: true,
    hasError: false,
  });

  const setTransactionsStoreError = (error: string) => {
    setTransactionsStore({
      isLoading: false,
      hasError: true,
      error
    });
  }

  const setTransactionsStoreLoading = () => {
    setTransactionsStore({
      isLoading: true,
      hasError: false,
    });
  }

  const setTransactionsStoreData = (data: Transaction[]) => {
    setTransactionsStore({
      isLoading: false,
      hasError: false,
      data
    });
  }

  const addTransaction = (data: Transaction) => {
    // TODO: add service method adding record to db
    const prevData = transactionsStore().data ?? [];
    setTransactionsStoreData([...prevData, data]);
  }

  const removeTransaction = (id: number) => {
    // TODO: add service method deleting record from db
    setTransactionsStoreData(
      transactionsStore().data!.filter(t => t.id !== id)
    );
  }

  const updateTransaction = (id: number, data: Partial<Transaction>) => {
    // TODO: add service method modifying record in db
    setTransactionsStoreData(
      transactionsStore().data!.map(transaction => {
        if (transaction.id !== id) return transaction;
        return { ...transaction, ...data }
      })
    );
  }

  const descSorter = (a: Transaction, b: Transaction) => a.createdAt > b.createdAt ? -1 : 1;

  const latestTransactions = createMemo(() => {
    if (transactionsStore().isLoading) {
      return null;
    }
    const now = Date.now();
    const min = now - RECENT_TRANSACTIONS_MAX_DAYS * 86400000;
    const nowDate = new Date(now).toISOString().split('T')[0];
    const minDate = new Date(min).toISOString().split('T')[0];

    const last10daysTransactions = transactionsStore().data!.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt).toISOString().split('T')[0];
      return transactionDate <= nowDate && transactionDate >= minDate;
    });

    return [...last10daysTransactions].sort(descSorter).slice(0, 3);
  })

  // TODO create filtering
  const getFilteredTransactions = (category: CategoryId | null, dateFilter: DateFilter) => {
    const filteredData = transactions.transactionsStore().data!.filter(t => {
      const dateMatches = t.createdAt >= dateFilter.startTimestamp && t.createdAt <= dateFilter.endTimestamp;
      return dateMatches && (category ? t.category === category : true)
    });
    return filteredData.sort(descSorter);
  }

  return {
    transactionsStore,
    latestTransactions,
    getFilteredTransactions,
    addTransaction,
    removeTransaction,
    updateTransaction,
    setTransactionsStoreError,
    setTransactionsStoreLoading,
    setTransactionsStoreData,
  };
}

export const transactions = createRoot(initTransactionsStore);
