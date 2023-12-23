import { ScreenHeader } from "@app/components";
import { t } from "@app/i18n";

export function TasksScreen() {
  return (
    <main>
      <ScreenHeader title={t("TasksScreen.title")} />
    </main>
  );
}
