import { TransactionGroup, TransactionList, TransactionListItem } from "../../../components";
import { groupTransactionsByDate, transactions } from "../../../stores";

export function LatestTransactions() {
  return (
    <TransactionList>
      {groupTransactionsByDate(transactions.getLatestTransactions()).map(group => (
        <TransactionGroup date={group.date}>
          {group.transactions.map(transaction => (
            <TransactionListItem {...transaction} />
          ))}
        </TransactionGroup>
      ))}
    </TransactionList>
  );
}