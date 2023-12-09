import { createRoot, createSignal } from "solid-js";
import { Transaction } from "./types";

const initData: Transaction[] = [
  {
    id: "1",
    title: "Maaş",
    date: "2023-11-30T10:37:24.803Z",
    category: "transfer",
    currency: "USD",
    type: "income",
    amount: 2500
  },
  {
    id: "2",
    title: "Vergilər",
    date: "2023-12-02T12:37:24.803Z",
    category: "transfer",
    currency: "USD",
    type: "expense",
    amount: 120
  },
  {
    id: "3",
    title: "Evə bazarlıq",
    date: "2023-12-03T17:42:24.803Z",
    category: "market",
    currency: "USD",
    type: "expense",
    amount: 70
  },
  {
    id: "4",
    title: "Qış ayaqqabısı",
    date: "2023-12-02T17:42:24.803Z",
    category: "clothing",
    currency: "USD",
    type: "expense",
    amount: 60
  },
  {
    id: "5",
    title: "PS çırpırıq manslar",
    date: "2023-11-29T17:42:24.803Z",
    category: "entertainment",
    currency: "USD",
    type: "expense",
    amount: 60
  },
  {
    id: "5",
    title: "Üregim tutdu, aptekə qaçdım",
    date: "2023-12-05T17:42:24.803Z",
    category: "health",
    currency: "USD",
    type: "expense",
    amount: 3.2
  },
];

function initTransactions() {
  const [getTransactions, setTransactions] = createSignal<Transaction[]>(initData);

  const addTransaction = (data: Transaction) => {
    setTransactions(prev => ([...prev, data]));
  }

  const removeTransaction = (id: string) => setTransactions(getTransactions().filter(t => t.id !== id));

  const updateTransaction = (id: string, data: Partial<Transaction>) => {
    setTransactions(
      getTransactions().map(transaction => {
        if (transaction.id !== id) return transaction;
        return { ...transaction, ...data }
      })
    );
  }

  const getLatestTransactions = () => {
    const now = Date.now();
    const min = now - 864000000;
    const nowDate = new Date(now).toISOString().split('T')[0];
    const minDate = new Date(min).toISOString().split('T')[0];

    const last10daysTransactions = getTransactions().filter(transaction => {
      const transactionDate = new Date(transaction.date).toISOString().split('T')[0];
      return transactionDate <= nowDate && transactionDate >= minDate;
    });

    return [...last10daysTransactions]
      .sort((a, b) => a.date > b.date ? -1 : 1)
      .slice(0, 3);
  }

  return {
    getTransactions,
    getLatestTransactions,
    addTransaction,
    removeTransaction,
    updateTransaction
  };
}

export const transactions = createRoot(initTransactions);
