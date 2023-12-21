import { logoDark, logoLight } from "@app/assets";
import { ThemeToggleButton } from "@app/components";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggleButton } from "@app/components/Dropdown";
import { getLocale, langData, setLocale } from "@app/i18n";
import { availableLangs } from "@app/i18n/init";
import { themeStore, user } from "@app/stores";
import { useNavigate } from "@solidjs/router";
import { For, ParentProps, onMount } from "solid-js";

const logos: Record<"dark" | "light", string> = {
  dark: logoDark,
  light: logoLight
};

export function AuthLayout(props: ParentProps) {
  const navigate = useNavigate();
  onMount(() => {
    if (user.currentUser().isAuthorized) {
      navigate("/home");
    }
  });

  return (
    <div class="pb-3">
      <div class="flex justify-between max-w-sm mx-auto px-6 pt-2">
        <Dropdown id="langDropdown" horizontalPlacement="left">
          <DropdownToggleButton variant="glass" size="md">
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
      <div class="flex justify-center py-5">
        <img src={logos[themeStore.theme()]} class="w-[230px] h-auto" />
      </div>
      {props.children}
    </div>
  );
}
