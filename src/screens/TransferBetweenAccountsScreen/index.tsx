import { ScreenHeader, VerticalScroll } from "@app/components";
import { Await } from "@app/stores";
import { Form } from "./Form";
import { t } from "@app/i18n";
import { useAccounts } from "@app/hooks";

export function TransferBetweenAccountsScreen() {
  const { accounts } = useAccounts();
  return (
    <main>
      <ScreenHeader withGoBackButton title={t("TransferBetweenAccountsScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <Await for={[accounts()]}>
          <Form />
        </Await>
      </VerticalScroll>
    </main>
  );
}
