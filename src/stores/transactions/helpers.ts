import { groupBy } from "@app/helpers";
import { Transaction, TransactionGroupSum } from "./types"
import { CurrencyCode, currencies } from "@app/constants";

export const groupTransactionsByDate = (transactions: Transaction[]) => {
  return groupBy(transactions, ({ transactionDate  }) => transactionDate);
}

export const sumAmountByCurrency = (transactions: Transaction[]): TransactionGroupSum[] => {
  const groups = groupBy(transactions, ({ currency }) => currency);

  return Object.entries(groups).map(([currency, _transactions]) => {
    const formatter = currencies[currency as CurrencyCode].formatter;
    const summ = _transactions.reduce((acc, transaction) => {
      const amount = transaction.type === "expense" ? transaction.amount * -1 : transaction.amount; 
      return acc + amount;
    }, 0);

    return { formatter, amount: summ };
  });
}
