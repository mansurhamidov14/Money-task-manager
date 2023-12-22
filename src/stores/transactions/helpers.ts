import { MS_IN_DAY } from "@app/constants";
import { Transaction, TransactionsGroup } from "./types"

export const groupTransactionsByDate = (
  transactions: Transaction[],
  calculateAmountPerDate = false
): TransactionsGroup[] => {
  const tempObj: Record<string, TransactionsGroup> = {};

  transactions.forEach(transaction => {
    const transactionDate = new Date(transaction.createdAt);
    transactionDate.setHours(0, 0, 0, 0);
    const transactionDateString = transactionDate.toISOString().split('T')[0]
    if (tempObj[transactionDateString]) {
      tempObj[transactionDateString].transactions.push(transaction);
      if (calculateAmountPerDate) {
        tempObj[transactionDateString].amount! += (
          transaction.type === "income"
            ? transaction.amount
            : transaction.amount * -1
        );
      }
    } else {
      tempObj[transactionDateString] = {
        date: transactionDate,
        amount: !calculateAmountPerDate
          ? null
          : transaction.type === "income"
            ? transaction.amount
            : transaction.amount * -1,
        transactions: [transaction]
      }
    }
  });

  return Object.values(tempObj);
}
