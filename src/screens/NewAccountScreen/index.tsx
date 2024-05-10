import { ScreenHeader, VerticalScroll } from "@app/components";
import { Form } from "./Form";
import { t } from "@app/i18n";

export function NewAccountScreen() {
  return (
    <main>
      <ScreenHeader withGoBackButton title={t("NewAccountScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <Form />
      </VerticalScroll>
    </main>
  );
}
