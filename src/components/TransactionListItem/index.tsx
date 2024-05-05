import { useNavigate } from "@solidjs/router";
import { createMemo } from "solid-js";
import { HiOutlinePencilSquare } from "solid-icons/hi";
import { IoTrash } from "solid-icons/io";
import type { CurrencyCode, Transaction } from "@app/entities";
import { Message, t } from "@app/i18n";
import { accountService, categoryService, currencyService } from "@app/services";
import { confirmationStore, toastStore } from "@app/stores";
import { ListItem } from "../ListItem";
import { useAccounts } from "@app/hooks";
import { TransactionListItemProps } from "./types";

function getTransactionValue(
  amount: number,
  currency: CurrencyCode,
  transactionType: Transaction['type']
) {
  return `${(transactionType === "expense" ? "-" : "+")}${currencyService.formatValue(currency, amount)}`;
}

export function TransactionListItem(props: TransactionListItemProps) {
  const { patchAccount } = useAccounts()
  const navigate = useNavigate();
  const categoryIcon = createMemo(() => {
    const Icon = categoryService.getIcon(props.transaction.category);
    return <Icon size={28} />;
  });

  const handleTransactionDelete = async (transaction: Transaction) => {
    const { id, account, amount, type } = transaction;
    props.onDelete(id);
    const balanceChange = type === "expense" ? amount : (amount * -1);
    const updateResponse = await accountService.changeBalance(account.id, balanceChange);
    patchAccount(updateResponse.data);
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
            "background-color": categoryService.getColors(props.transaction.category).accent,
            "color": categoryService.getColors(props.transaction.category).icon
          }}
        >
          {categoryIcon()}
        </div>
      )}
      title={props.transaction.title}
      description={<Message>{`Category.${props.transaction.category}`}</Message>}
      rightElement={(
        <>
          <div class={`text font-bold text-${props.transaction.type}`}>
            {getTransactionValue(props.transaction.amount, props.transaction.account.currency, props.transaction.type)}
          </div>
          <div class="text-muted text-xs mt-1.5">
            {new Date(props.transaction.transactionDateTime).toLocaleTimeString("en-GB", { hour: '2-digit', minute:'2-digit' })}
          </div>
        </>
      )}
      controls={[
        {
          label: t("Edit", "Actions"),
          icon: HiOutlinePencilSquare,
          variant: "primary",
          onClick: () => navigate(`/edit-transaction/${props.transaction.id}`)
        },
        {
          label: t("Delete", "Actions"),
          icon: IoTrash,
          variant: "danger",
          onClick: () => requestTransactionDelete(props.transaction)
        },
      ]}
    />
  );
}
