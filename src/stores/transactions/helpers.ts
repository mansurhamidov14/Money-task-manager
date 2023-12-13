import { Transaction, TransactionsGroup } from "./types"

export const groupTransactionsByDate = (transactions: Transaction[]): TransactionsGroup[] => {
  const tempObj: Record<string, TransactionsGroup> = {};

  transactions.forEach(transaction => {
    const transactionDate = new Date(transaction.createdAt).toISOString().split('T')[0];
    if (tempObj[transactionDate]) {
      tempObj[transactionDate].transactions.push(transaction);
    } else {
      tempObj[transactionDate] = {
        date: transactionDate,
        transactions: [transaction]
      }
    }
  });

  return Object.values(tempObj);
}

export const sumAmountSinceMonthStart = (
  transactions: Transaction[],
  transactionType: Transaction['type']
) => {
  const endTimestamp = Date.now();
  const startDate = new Date(endTimestamp);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);
  const startTimestamp = startDate.getTime();
  return transactions
    .filter(
      t => t.createdAt >= startTimestamp &&
        t.createdAt <= endTimestamp &&
        t.type === transactionType
    )
    .reduce((acc, val) => acc + val.amount, 0);
}
