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
