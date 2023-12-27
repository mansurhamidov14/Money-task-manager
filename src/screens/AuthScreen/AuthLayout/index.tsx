import { Navigate } from "@solidjs/router";
import { For, ParentProps, Show } from "solid-js";
import { logoDark, logoLight } from "@app/assets";
import { ThemeToggleButton, VerticalScroll } from "@app/components";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggleButton } from "@app/components/Dropdown";
import { getLocale, langData, setLocale } from "@app/i18n";
import { availableLangs } from "@app/i18n/init";
import { themeStore, user } from "@app/stores";

const logos: Record<"dark" | "light", string> = {
  dark: logoDark,
  light: logoLight
};

export function AuthLayout(props: ParentProps) {
  return (
    <Show
      when={user.currentUser().status !== "authorized"}
      fallback={<Navigate href="/home" />}
    >
      <VerticalScroll>
        <div class="pb-3">
          <div class="flex justify-between px-6 pt-2">
            <Dropdown id="langDropdown" horizontalPlacement="left">
              <DropdownToggleButton variant="transparent" size="md">
                <div class="flex items-center gap-2">
                  <img class="w-5 h-5" src={langData[getLocale()].flag} />
                  <span>{langData[getLocale()].code}</span>
                </div>
              </DropdownToggleButton>
              <DropdownMenu class="font-medium w-[11em]">
                <For each={availableLangs}>
                  {lang => (
                    <DropdownItem onClick={() => setLocale(lang)}>
                      <div class="flex gap-2">
                        <img class="w-5 h-5" src={langData[lang].flag} />
                        <span>{langData[lang].name}</span>
                      </div>
                    </DropdownItem>
                  )}
                </For>
              </DropdownMenu>
            </Dropdown>
            <ThemeToggleButton />
          </div>
          <div class="flex justify-center py-5 relative animate-slide-up">
            <img src={logos[themeStore.theme()]} class="w-[230px] h-auto" />
          </div>
          <div class="animate-fade-in">
            {props.children}
          </div>
        </div>
      </VerticalScroll>
    </Show>
  );
}
