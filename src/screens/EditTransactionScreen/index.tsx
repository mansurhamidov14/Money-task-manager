import { createSignal, onMount } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";

import { ScreenHeader, VerticalScroll } from "@app/components";
import { Transaction } from "@app/entities";
import { useAccounts } from "@app/hooks";
import { t } from "@app/i18n";
import { Await } from "@app/stores";
import { transactionService } from "@app/services";
import { Form } from "./Form";

export function EditTransactionScreen() {
  const { accounts } = useAccounts();
  const [editedTransaction, setEditedTransaction] = createSignal<Transaction | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  onMount(async () => {
    const editedTransaction = await transactionService.getById(params.id);
    if (!editedTransaction) {
      return navigate("/");
    }

    setEditedTransaction(editedTransaction.data);
  });

  return (
    <main>
      <ScreenHeader withGoBackButton title={t("EditTransactionScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <Await for={[accounts(), editedTransaction()]}>
          <Form {...editedTransaction()!} />
        </Await>
      </VerticalScroll>
    </main>
  );
}
