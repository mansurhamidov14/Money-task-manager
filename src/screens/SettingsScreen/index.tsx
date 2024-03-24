import { useNavigate } from "@solidjs/router";
import { BsShieldLockFill } from "solid-icons/bs";
import { FaSolidCircleUser } from "solid-icons/fa";
import { IoKey, IoLanguage, IoPencil } from "solid-icons/io";
import { VsColorMode } from "solid-icons/vs";

import { List, ListItem, ScreenHeader, ThemeToggleButton, VerticalScroll } from "@app/components";
import { getLocale, langData, t } from "@app/i18n";
import { Link, confirmationStore, toastStore, user } from "@app/stores";

import { ChevronRight, ItemIcon } from "./components";
import { FiLogOut } from "solid-icons/fi";
import { cacheService } from "@app/services";
import { TbDatabaseX } from "solid-icons/tb";

export function SettingsScreen() {
  const currentUser = user.currentUser().data!;
  const navigate = useNavigate();

  const requestCacheClear = () => {
    confirmationStore.requestConfirmation({
      onConfirm: () => {
        cacheService.clear();
        toastStore.pushToast("success", t("SettingsScreen.clearCache.success"));
      }
    });
  }

  return (
    <main>
      <ScreenHeader title={t("SettingsScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <div class="flex py-3 flex-col items-center gap-2">
          <img src={currentUser.avatar} class="max-w-full rounded-full" />
          <Link href="/settings/change-avatar" class="btn btn-transparent btn-sm flex gap-1 text-green-600 dark:text-green-300">
            <IoPencil />
            <span>{t("SettingsScreen.changeAvatar.title")}</span>
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
          <List>
            <ListItem
              size="sm"
              onClick={() => navigate("/settings/personal-info")}
              icon={<ItemIcon icon={FaSolidCircleUser} />}
              title={t("SettingsScreen.personalInfo.title")}
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
              onClick={() => navigate("/settings/change-password")}
              icon={<ItemIcon icon={IoKey} />}
              title={t("SettingsScreen.changePassword.title")}
              rightElement={<ChevronRight />}
            />
            <ListItem
              size="sm"
              onClick={() => navigate("/settings/change-pin")}
              icon={<ItemIcon icon={BsShieldLockFill} />}
              title={t("SettingsScreen.pinCode.title")}
              rightElement={<ChevronRight />}
            />
            <ListItem
              size="sm"
              onClick={requestCacheClear}
              icon={<ItemIcon icon={TbDatabaseX} />}
              title={t("SettingsScreen.clearCache.title")}
            />
            {/* <ListItem
              size="sm"
              icon={<ItemIcon colorClass="text-red-600 dark:text-red-400" icon={IoTrash} />}
              title={<span class="text-red-600 dark:text-red-400">{t("SettingsScreen.wipeData")}</span>}
              rightElement={<ChevronRight />}
            /> */}
            <ListItem
              size="sm"
              onClick={user.logOut}
              icon={<ItemIcon colorClass="text-red-600 dark:text-red-400" icon={FiLogOut} />}
              title={<span class="text-red-600 dark:text-red-400">{t("SettingsScreen.logOut")}</span>}
            />
          </List>
        </div>
      </VerticalScroll>
    </main>
  );
}
