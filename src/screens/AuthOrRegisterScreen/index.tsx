import { For } from "solid-js";
import { Navigate, Route, HashRouter as Router } from "@solidjs/router";
import { ThemeToggleButton } from "@app/components";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignUpForm";
import { logoDark, logoLight } from "@app/assets";
import { Dropdown } from "@app/components/Dropdown";
import { getLocale, langData, setLocale } from "@app/i18n";
import { RerenderOnLangChange } from "@app/i18n/components";
import { availableLangs } from "@app/i18n/init";
import { themeStore } from "@app/stores";

const logos: Record<"dark" | "light", string> = {
  dark: logoDark,
  light: logoLight
};

export function AuthScreen() {
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
        <Router>
          <Route path="/" component={() => <Navigate href="/auth/signin" />} />
          <Route path="/history" component={() => <Navigate href="/auth/signin" />} />
          <Route path="/home" component={() => <Navigate href="/auth/signin" />} />
          <Route path="/auth/signin" component={LoginForm} />
          <Route path="/auth/register" component={SignupForm} />
        </Router>
      </RerenderOnLangChange>
    </div>
  );
}
