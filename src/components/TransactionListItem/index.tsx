import { createMemo } from "solid-js";
import {
  Categories,
  CategoryId,
  CurrencyCode,
  currencies
} from "@app/constants";
import { Message, t } from "@app/i18n";
import { Transaction, accountsStore, confirmationStore, toastStore, transactionsStore } from "@app/stores";
import { ListItem } from "../ListItem";
// import { HiOutlinePencilSquare } from "solid-icons/hi";
import { IoTrash } from "solid-icons/io";

export type TransactionListItemProps = {
  category: CategoryId;
  title: string;
  amount: number;
  currency: CurrencyCode;
  transactionType: "expense" | "income";
  date: string;
}

function getTransactionValue(
  amount: number,
  currency: CurrencyCode,
  transactionType: TransactionListItemProps["transactionType"]
) {
  return `${(transactionType === "expense" ? "-" : "+")}${currencies[currency].formatter(amount)}`;
}

export function TransactionListItem(props: Transaction) {
  const categoryIcon = createMemo(() => {
    const Icon = Categories[props.category].icon;
    return <Icon size={28} />;
  });

  const handleTransactionDelete = async (transaction: Transaction) => {
    const { id, account, amount, type } = transaction;
    await transactionsStore.deleteTransaction(id);
    await accountsStore.changeBalance(account, amount * -1, type);
    toastStore.pushToast("success", "Transaction deleted successfully");
  }

  const requestTransactionDelete = (transaction: Transaction) => {
    confirmationStore.requestConfirmation({
      onConfirm: () => handleTransactionDelete(transaction)
    });
  }
  
  return (
    <ListItem
      size="lg"
      icon={(
        <div
          class="h-full flex justify-center items-center"
          style={{
            "background-color": Categories[props.category].colors.accent,
            "color": Categories[props.category].colors.icon
          }}
        >
          {categoryIcon()}
        </div>
      )}
      title={props.title}
      description={<Message>{`Category.${props.category}`}</Message>}
      rightElement={(
        <>
          <div class={`text font-bold text-${props.type}`}>
            {getTransactionValue(props.amount, props.currency, props.type)}
          </div>
          <div class="text-muted text-xs mt-1.5">
            {new Date(props.transactionDateTime).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
          </div>
        </>
      )}
      controls={[
        // {
        //   label: t("Edit", "Actions"),
        //   icon: HiOutlinePencilSquare,
        //   variant: "primary",
        //   onClick: () => alert("Edit")
        // },
        {
          label: t("Delete", "Actions"),
          icon: IoTrash,
          variant: "danger",
          onClick: () => requestTransactionDelete(props)
        },
      ]}
    />
  );
}
