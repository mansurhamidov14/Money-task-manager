import { createSignal } from "solid-js";
import { Transaction } from "../transactions/types";

/** Store for keeping income and expenses for particular account */
export function initCountersStore(transactions: Transaction[]) {
  let initIncome = 0;
  let initExpense = 0;

  transactions.forEach(transaction => {
    if (transaction.type === "expense") {
      initExpense += transaction.amount;
    } else {
      initIncome += transaction.amount;
    }
  });
  const [totalIncome, setTotalIncome] = createSignal<number>(initIncome);
  const [totalExpense, setTotalExpense] = createSignal<number>(initExpense);

  return {
    totalExpense,
    totalIncome,
    setTotalExpense,
    setTotalIncome
  }
}

/** We will fill this object later with counters for each account */
export const counters: Record<number, ReturnType<typeof initCountersStore>> = {};

// @ts-ignore
window.counters = counters;
