import { Transaction } from "@app/entities"

export type TransactionListItemProps = {
  transaction: Transaction;
  onDelete: (id: Transaction['id']) => void;
}