import { createRoot, createSignal } from "solid-js";

export type Theme = "dark" | "light";
const localStoreAccessKey = "WFOAppTheme";
function initThemeStore() {
  const htmlDoc = document.getElementsByTagName("html")[0];
  const localStorageValue = localStorage.getItem(localStoreAccessKey) as Theme;
  const [theme, setTheme] = createSignal<Theme>(
    localStorageValue ?? (
      window?.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    )
  );
  htmlDoc.className = theme();

  if (!localStorageValue) {
    localStorage.setItem(localStoreAccessKey, theme());
  }

  const toggleTheme = () => {
    const newTheme = theme() === "dark" ? "light" : "dark";
    localStorage.setItem(localStoreAccessKey, newTheme);
    htmlDoc.className = newTheme;
    setTheme(newTheme);
  }

  return { theme, toggleTheme }
}

export const themeStore = createRoot(initThemeStore);
