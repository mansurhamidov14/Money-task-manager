import { Show, createSignal, onMount } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";

import { Loading, ScreenHeader } from "@app/components";
import { t } from "@app/i18n";
import { accountService } from "@app/services";
import { user, accountsStore, Account, transactionsStore } from "@app/stores";

import { Form } from "./Form";

export function EditAccountScreen() {
  const userId = user.currentUser().data!.id;
  const [editedAccount, setEditedAccount] = createSignal<Account>();
  const navigate = useNavigate();
  const routeParams = useParams();

  onMount(async () => {
    const account = await accountService.getById(Number(routeParams.id), userId);
    if (!account) {
      return navigate("/");
    }

    setEditedAccount(account);
  });

  return (
    <main>
      <ScreenHeader withGoBackButton title={t("EditAccountScreen.title")} />
      <Show
        when={
          accountsStore.accounts().status === "success" &&
          transactionsStore.transactions().status === "success" &&
          editedAccount()
        }
        fallback={<Loading />}
      >
        <Form {...editedAccount()!} />
      </Show>
    </main>
  );
}
