import { Show } from "solid-js";
import { Loading, ScreenHeader, VerticalScroll } from "@app/components";
import { accountsStore, transactionsStore } from "@app/stores";
import { Form } from "./Form";
import { t } from "@app/i18n";

export function NewTransactionScreen() {
  return (
    <main>
      <ScreenHeader withGoBackButton title={t("NewTransactionScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <Show
          when={transactionsStore.transactions().status === "success" && accountsStore.accounts().status === "success"}
          fallback={<Loading />}
        >
          <Form />
        </Show>
      </VerticalScroll>
    </main>
  );
}
