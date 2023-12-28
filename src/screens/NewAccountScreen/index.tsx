import { Show } from "solid-js";
import { Loading, ScreenHeader, VerticalScroll } from "@app/components";
import { accountsStore } from "@app/stores";
import { Form } from "./Form";
import { t } from "@app/i18n";

export function NewAccountScreen() {
  return (
    <main>
      <ScreenHeader withGoBackButton title={t("NewAccountScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <Show 
            when={accountsStore.accounts().status === "success"}
            fallback={<Loading />}
          >
          <Form />
        </Show>
      </VerticalScroll>
    </main>
  );
}
