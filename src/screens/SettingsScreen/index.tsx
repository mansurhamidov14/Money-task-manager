import { ScreenHeader } from "@app/components";
import { t } from "@app/i18n";

export function SettingsScreen() {
  return (
    <main>
      <ScreenHeader title={t("SettingsScreen.title")} />
    </main>
  );
}
