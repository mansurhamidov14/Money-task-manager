import { Transaction, TransactionGroupSum } from "./types"
import { CurrencyCode, currencies } from "@app/constants";

export const groupTransactionsByDate = (transactions: Transaction[]) => {
  return transactions.groupBy(({ transactionDate  }) => transactionDate);
}

export const sumAmountByCurrency = (transactions: Transaction[]): TransactionGroupSum[] => {
  const groups = transactions.groupBy(({ currency }) => currency);

  return Object.entries(groups).map(([currency, _transactions]) => {
    const formatter = currencies[currency as CurrencyCode].formatter;
    const summ = _transactions.reduce((acc, transaction) => {
      const amount = transaction.type === "expense" ? transaction.amount * -1 : transaction.amount; 
      return acc + amount;
    }, 0);

    return { formatter, amount: summ };
  });
}

export const descSorter = (a: Transaction, b: Transaction) => {
  return a.transactionDateTime > b.transactionDateTime ? -1 : 1;
}
