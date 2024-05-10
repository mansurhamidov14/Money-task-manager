import { ScreenHeader, VerticalScroll } from "@app/components";
import { Await } from "@app/stores";
import { Form } from "./Form";
import { t } from "@app/i18n";
import { useAccounts } from "@app/hooks";

export function NewTransactionScreen() {
  const { accounts } = useAccounts()
  return (
    <main>
      <ScreenHeader withGoBackButton title={t("NewTransactionScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <Await for={[accounts()]}>
          <Form />
        </Await>
      </VerticalScroll>
    </main>
  );
}
