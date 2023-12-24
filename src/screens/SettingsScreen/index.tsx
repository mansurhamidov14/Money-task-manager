import { Button, List, ListItem, ScreenHeader, ThemeToggleButton, VerticalScroll } from "@app/components";
import { getLocale, langData, t } from "@app/i18n";

import avatar1 from "@app/assets/avatars/1.png";
import { IoKey, IoLanguage, IoPencil, IoTrash } from "solid-icons/io";
import { FaSolidCircleUser } from "solid-icons/fa";
import { user } from "@app/stores";
import { VsColorMode } from "solid-icons/vs";
import { BsShieldLockFill } from "solid-icons/bs";
import { ItemIcon } from "./components";

export function SettingsScreen() {
  return (
    <main>
      <ScreenHeader title={t("SettingsScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <div class="flex py-3 flex-col items-center gap-3">
          <img src={avatar1} class="max-w-full rounded-full" />
          <Button class="flex gap-1" variant="transparent" size="sm">
            <IoPencil />
            <span>Change avatar</span>
          </Button>
        </div>
        <div class="px-3">
          <List itemsGap="sm">
            <ListItem
              size="sm"
              icon={<ItemIcon icon={FaSolidCircleUser} />}
              title="Personal Info"
              description={(
                <>
                  {user.currentUser().data!.firstName} {user.currentUser().data!.lastName}
                </>
              )}
            />
            <ListItem
              size="sm"
              icon={<ItemIcon icon={IoLanguage} />}
              title="Language"
              rightElement={(
                <span class="inline-flex text-sm gap-2 items-center text-secondary-400 dark:text-secondary-300 font-normal">
                  <span>{langData[getLocale()].name}</span>
                  <img class="w-4 h-4" src={langData[getLocale()].flag} />
                </span>
              )}
            />
            <ListItem
              size="sm"
              icon={<ItemIcon icon={VsColorMode} />}
              title="Color mode"
              rightElement={<ThemeToggleButton />}
            />
            <ListItem
              size="sm"
              icon={<ItemIcon icon={IoKey} />}
              title="Password"
            />
            <ListItem
              size="sm"
              icon={<ItemIcon icon={BsShieldLockFill} />}
              title="PIN code"
            />
            <ListItem
              size="sm"
              icon={<ItemIcon icon={IoTrash} />}
              title="Wipe data"
            />
          </List>
        </div>
      </VerticalScroll>
    </main>
  );
}
