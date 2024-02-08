import { ScreenHeader, VerticalScroll } from "@app/components";
import { t } from "@app/i18n";
import { Form } from "../components/TaskForm";

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
