import { useNavigate } from "@solidjs/router";
import { createMemo } from "solid-js";
import { HiOutlinePencilSquare } from "solid-icons/hi";
import { IoTrash } from "solid-icons/io";
import { Message, t } from "@app/i18n";
import { categoryService, CategoryId, currenciecService, type CurrencyCode } from "@app/services";
import { Transaction, accountsStore, confirmationStore, toastStore, transactionsStore } from "@app/stores";
import { ListItem } from "../ListItem";

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
  return `${(transactionType === "expense" ? "-" : "+")}${currenciecService.formatValue(currency, amount)}`;
}

export function TransactionListItem(props: Transaction) {
  const navigate = useNavigate();
  const categoryIcon = createMemo(() => {
    const Icon = categoryService.getIcon(props.category);
    return <Icon size={28} />;
  });

  const handleTransactionDelete = async (transaction: Transaction) => {
    const { id, account, amount, type } = transaction;
    await transactionsStore.deleteTransaction(id);
    await accountsStore.changeBalance(account, amount * -1, type);
    toastStore.pushToast("success", t("ConfirmationRequest.transactionDeletion.success"));
  };

  const requestTransactionDelete = (transaction: Transaction) => {
    confirmationStore.requestConfirmation({
      text: t("ConfirmationRequest.transactionDeletion.text"),
      onConfirm: () => handleTransactionDelete(transaction),
      confirmButton: {
        label: t("ConfirmationRequest.transactionDeletion.confirm")
      }
    });
  };
  
  return (
    <ListItem
      size="lg"
      icon={(
        <div
          class="h-full flex justify-center items-center"
          style={{
            "background-color": categoryService.getColors(props.category).accent,
            "color": categoryService.getColors(props.category).icon
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
            {new Date(props.transactionDateTime).toLocaleTimeString("en-GB", { hour: '2-digit', minute:'2-digit' })}
          </div>
        </>
      )}
      controls={[
        {
          label: t("Edit", "Actions"),
          icon: HiOutlinePencilSquare,
          variant: "success",
          onClick: () => navigate(`/edit-transaction/${props.id}`)
        },
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
