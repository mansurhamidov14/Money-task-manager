import { createSignal, onMount } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";

import { ScreenHeader, VerticalScroll } from "@app/components";
import { t } from "@app/i18n";
import { Await, Transaction, accountsStore, transactionsStore } from "@app/stores";
import { transactionService } from "@app/services";
import { Form } from "./Form";

export function EditTransactionScreen() {
  const [editedTransaction, setEditedTransaction] = createSignal<Transaction | null>(null);
  const routeParams = useParams();
  const navigate = useNavigate();

  onMount(async () => {
    const editedTransactionId = Number(routeParams.id);
    const editedTransaction = await transactionService.getById(editedTransactionId);
    if (!editedTransaction) {
      return navigate("/");
    }

    setEditedTransaction(editedTransaction);
  });

  return (
    <main>
      <ScreenHeader withGoBackButton title={t("EditTransactionScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <Await for={[transactionsStore.transactions(), accountsStore.accounts(), editedTransaction()]}>
          <Form {...editedTransaction()!} />
        </Await>
      </VerticalScroll>
    </main>
  );
}
