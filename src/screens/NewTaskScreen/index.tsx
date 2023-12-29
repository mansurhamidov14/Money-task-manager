import { ScreenHeader, VerticalScroll } from "@app/components";
import { Form } from "./Form";
import { t } from "@app/i18n";

export function NewTaskScreen() {
  return (
    <main>
      <ScreenHeader withGoBackButton title={t("NewTaskScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <Form />
      </VerticalScroll>
    </main>
  );
}
