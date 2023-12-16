import { Navigate, Route, HashRouter as Router } from "@solidjs/router";
import { ThemeToggleButton } from "@app/components";
import logoLight from "@app/assets/logo-7-light.png";
import logoDark from "@app/assets/logo-7.png";
import { LoginScreen } from "./LoginScreen";
import { RegisterScreen } from "./RegisterScreen";
import themeStore from "@app/stores/theme";

const logos: Record<"dark" | "light", string> = {
  dark: logoDark,
  light: logoLight
};

export function AuthScreen() {
  return (
    <div class="bg-secondary-100 h-[100svh] dark:bg-gray-800 overflow-y-auto">
      <div class="flex justify-end max-w-sm mx-auto px-6 pt-2">
        <ThemeToggleButton />
      </div>
      <div class="flex justify-center py-5">
        <img src={logos[themeStore.theme()]} class="w-[230px] h-auto" />
      </div>
      <Router>
        <Route path="/" component={() => <Navigate href="/auth/signin" />} />
        <Route path="/auth/signin" component={LoginScreen} />
        <Route path="/auth/register" component={RegisterScreen} />
      </Router>
    </div>
  );
}
