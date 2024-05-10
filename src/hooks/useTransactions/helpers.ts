import { type CurrencyCode, Transaction, TransactionGroupSum } from "@app/entities";
import { groupBy } from "@app/helpers";
import { currencyService } from "@app/services";

export const groupTransactionsByDate = (transactions: Transaction[]) => {
  return groupBy(transactions, ({ transactionDateTime }) => new Date(transactionDateTime).toDatePickerString());
}

export const sumAmountByCurrency = (transactions: Transaction[]): TransactionGroupSum[] => {
  const groups = groupBy(transactions, ({ account }) => account.currency);

  return Object.entries(groups).map(([currencyCode, _transactions]) => {
    const currency = currencyService.getCurrency(currencyCode as CurrencyCode);
    const summ = _transactions.reduce((acc, transaction) => {
      const amount = transaction.type === "expense" ? transaction.amount * -1 : transaction.amount; 
      return acc + amount;
    }, 0);

    return { currency, amount: summ };
  });
}