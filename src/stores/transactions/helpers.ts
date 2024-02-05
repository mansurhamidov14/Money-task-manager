import { groupBy } from "@app/helpers";
import { type CurrencyCode, currenciecService } from "@app/services";
import { Transaction, TransactionGroupSum } from "./types";

export const groupTransactionsByDate = (transactions: Transaction[]) => {
  return groupBy(transactions, ({ transactionDate  }) => transactionDate);
}

export const sumAmountByCurrency = (transactions: Transaction[]): TransactionGroupSum[] => {
  const groups = groupBy(transactions, ({ currency }) => currency);

  return Object.entries(groups).map(([currency, _transactions]) => {
    const formatter = currenciecService.getFormatter(currency as CurrencyCode);
    const summ = _transactions.reduce((acc, transaction) => {
      const amount = transaction.type === "expense" ? transaction.amount * -1 : transaction.amount; 
      return acc + amount;
    }, 0);

    return { formatter, amount: summ };
  });
}
