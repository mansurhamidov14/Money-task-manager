import { List, ListItem, ScreenHeader, VerticalScroll } from "@app/components";
import { getLocale, langData, setLocale, t } from "@app/i18n";
import { For } from "solid-js";
import { Lang } from "@app/i18n/types";
import { FaSolidCircleCheck } from "solid-icons/fa";

export function ChangeLanguageScreen() {
  const handleLanguageChange = (lang: Lang) => {
    setLocale(lang);
    history.back();
  }

  return (
    <main>
      <ScreenHeader withGoBackButton title={t("SettingsScreen.language")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <div class="p-3">
          <List itemsGap="sm">
            <For each={Object.entries(langData)}>
              {([lang, data]) => (
                <ListItem
                  size="sm"
                  icon={<div class="h-full flex items-center justify-center"><img src={data.flag} width={24} height={24} /></div>}
                  title={data.name}
                  onClick={() => handleLanguageChange(lang as any)}
                  rightElement={getLocale() === lang ? <FaSolidCircleCheck class="text-green-500" size={18} /> : undefined}
                />
              )}
            </For>
          </List>
        </div>
      </VerticalScroll>
    </main>
  );
}
