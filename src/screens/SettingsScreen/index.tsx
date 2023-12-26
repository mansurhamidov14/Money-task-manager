import { useNavigate } from "@solidjs/router";
import { BsShieldLockFill } from "solid-icons/bs";
import { FaSolidCircleUser } from "solid-icons/fa";
import { IoKey, IoLanguage, IoPencil, IoTrash } from "solid-icons/io";
import { VsColorMode } from "solid-icons/vs";

import { List, ListItem, ScreenHeader, ThemeToggleButton, VerticalScroll } from "@app/components";
import { getLocale, langData, t } from "@app/i18n";
import { Link, user } from "@app/stores";

import { ChevronRight, ItemIcon } from "./components";

export function SettingsScreen() {
  const currentUser = user.currentUser().data!;
  const navigate = useNavigate();

  return (
    <main>
      <ScreenHeader title={t("SettingsScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <div class="flex py-3 flex-col items-center gap-2">
          <img src={currentUser.avatar} class="max-w-full rounded-full" />
          <Link href="/settings/change-avatar" class="btn btn-transparent btn-sm flex gap-1 text-green-600 dark:text-green-300">
            <IoPencil />
            <span>{t("SettingsScreen.changeAvatar")}</span>
          </Link>
          <div class="text-center">
            <h3 class="text-lg font-bold">
              {currentUser.firstName} {currentUser.lastName}
            </h3>
            <div class="text-muted text-sm">
              {currentUser.email}
            </div>
          </div>
        </div>
        <div class="px-3 pt-2">
          <List itemsGap="sm">
            <ListItem
              size="sm"
              onClick={() => navigate("/settings/personal-info")}
              icon={<ItemIcon icon={FaSolidCircleUser} />}
              title={t("SettingsScreen.personalInfo")}
              rightElement={<ChevronRight />}
            />
            <ListItem
              size="sm"
              onClick={() => navigate("/settings/change-language")}
              icon={<ItemIcon icon={IoLanguage} />}
              title={t("SettingsScreen.language")}
              rightElement={(
                <span class="inline-flex text-sm gap-2 items-center">
                  <span class="text-muted font-normal">{langData[getLocale()].name}</span>
                  <img class="w-4 h-4" src={langData[getLocale()].flag} />
                  <ChevronRight />
                </span>
              )}
            />
            <ListItem
              size="sm"
              icon={<ItemIcon icon={VsColorMode} />}
              title={t("SettingsScreen.colorScheme")}
              rightElement={<ThemeToggleButton />}
            />
            <ListItem
              size="sm"
              icon={<ItemIcon icon={IoKey} />}
              title={t("SettingsScreen.password")}
              rightElement={<ChevronRight />}
            />
            <ListItem
              size="sm"
              icon={<ItemIcon icon={BsShieldLockFill} />}
              title={t("SettingsScreen.pinCode")}
              rightElement={<ChevronRight />}
            />
            <ListItem
              size="sm"
              icon={<ItemIcon colorClass="text-red-600 dark:text-red-400" icon={IoTrash} />}
              title={<span class="text-red-600 dark:text-red-400">{t("SettingsScreen.wipeData")}</span>}
              rightElement={<ChevronRight />}
            />
          </List>
        </div>
      </VerticalScroll>
    </main>
  );
}
