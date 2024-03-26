import { appTheme } from "@app/storage";
import { createRoot, createSignal } from "solid-js";

export type Theme = "dark" | "light";
function initThemeStore() {
  const htmlDoc = document.getElementsByTagName("html")[0];
  const [theme, setTheme] = createSignal<Theme>(appTheme.value);
  htmlDoc.className = theme();

  appTheme.on("change", (value) => {
    htmlDoc.className = value;
    setTheme(value);
  })

  const toggleTheme = () => {
    const newTheme = theme() === "dark" ? "light" : "dark";
    appTheme.value = newTheme;
  }

  return { theme, toggleTheme }
}

export const themeStore = createRoot(initThemeStore);
