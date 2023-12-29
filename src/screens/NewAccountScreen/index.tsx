import { ScreenHeader, VerticalScroll } from "@app/components";
import { Await, accountsStore } from "@app/stores";
import { Form } from "./Form";
import { t } from "@app/i18n";

export function NewAccountScreen() {
  return (
    <main>
      <ScreenHeader withGoBackButton title={t("NewAccountScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <Await for={[accountsStore.accounts()]}>
          <Form />
        </Await>
      </VerticalScroll>
    </main>
  );
}
