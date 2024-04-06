import { useNavigate } from "@solidjs/router";
import { createMemo } from "solid-js";
import { HiOutlinePencilSquare } from "solid-icons/hi";
import { IoTrash } from "solid-icons/io";
import type { CategoryId, CurrencyCode, Transaction } from "@app/entities";
import { Message, t } from "@app/i18n";
import { accountService, categoryService, currencyService, transactionService } from "@app/services";
import { confirmationStore, toastStore } from "@app/stores";
import { ListItem } from "../ListItem";
import { useAccounts } from "@app/hooks";

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
  return `${(transactionType === "expense" ? "-" : "+")}${currencyService.formatValue(currency, amount)}`;
}

export function TransactionListItem(props: Transaction) {
  const { refetchAccounts } = useAccounts()
  const navigate = useNavigate();
  const categoryIcon = createMemo(() => {
    const Icon = categoryService.getIcon(props.category);
    return <Icon size={28} />;
  });

  const handleTransactionDelete = async (transaction: Transaction) => {
    const { id, account, amount, type } = transaction;
    await transactionService.delete(id);
    const balanceChange = type === "expense" ? amount : (amount * -1);
    await accountService.changeBalance(account.id, balanceChange);
    refetchAccounts();
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
            {getTransactionValue(props.amount, props.account.currency, props.type)}
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
          variant: "primary",
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
