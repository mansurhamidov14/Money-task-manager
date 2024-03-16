import { groupBy } from "@app/helpers";
import { currencyService } from "@app/services";
import { Transaction, TransactionGroupSum } from "./types";
import type { CurrencyCode } from "@app/entities";

export const groupTransactionsByDate = (transactions: Transaction[]) => {
  return groupBy(transactions, ({ transactionDate  }) => transactionDate);
}

export const sumAmountByCurrency = (transactions: Transaction[]): TransactionGroupSum[] => {
  const groups = groupBy(transactions, ({ currency }) => currency);

  return Object.entries(groups).map(([currencyCode, _transactions]) => {
    const currency = currencyService.getCurrency(currencyCode as CurrencyCode);
    const summ = _transactions.reduce((acc, transaction) => {
      const amount = transaction.type === "expense" ? transaction.amount * -1 : transaction.amount; 
      return acc + amount;
    }, 0);

    return { currency, amount: summ };
  });
}
