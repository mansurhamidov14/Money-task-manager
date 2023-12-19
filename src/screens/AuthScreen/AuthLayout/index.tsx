import { logoDark, logoLight } from "@app/assets";
import { ThemeToggleButton } from "@app/components";
import { Dropdown } from "@app/components/Dropdown";
import { getLocale, langData, setLocale } from "@app/i18n";
import { RerenderOnLangChange } from "@app/i18n/components";
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
    <div class="bg-secondary-100 h-[100svh] dark:bg-gray-800 overflow-y-auto pb-3">
      <div class="flex justify-between max-w-sm mx-auto px-6 pt-2">
        <Dropdown id="langDropdown">
          <Dropdown.ToggleButton variant="glass" size="md">
            <div class="flex items-center gap-2">
              <img class="w-5 h-5" src={langData[getLocale()].flag} />
              <span>{langData[getLocale()].code}</span>
            </div>
          </Dropdown.ToggleButton>
          <Dropdown.Menu class="font-medium w-[11em]">
            <For each={availableLangs}>
              {lang => (
                <Dropdown.Menu.Item onClick={() => setLocale(lang)}>
                  <div class="flex gap-2">
                    <img class="w-5 h-5" src={langData[lang].flag} />
                    <span>{langData[lang].name}</span>
                  </div>
                </Dropdown.Menu.Item>
              )}
            </For>
          </Dropdown.Menu>
        </Dropdown>
        <ThemeToggleButton />
      </div>
      <div class="flex justify-center py-5">
        <img src={logos[themeStore.theme()]} class="w-[230px] h-auto" />
      </div>
      <RerenderOnLangChange>
        {props.children}
      </RerenderOnLangChange>
    </div>
  );
}
