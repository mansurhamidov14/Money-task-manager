import { IoMoon, IoSunny } from "solid-icons/io";
import { Show } from "solid-js";
import { themeStore } from "@app/stores"

export function ThemeToggleButton() {
  const { theme, toggleTheme } = themeStore;
  return (
    <button onClick={toggleTheme} class="text-gray-500 inline-flex items-center justify-center dark:text-gray-400 hover:bg-gray-200 w-10 h-10 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-xl p-1.5">
      <Show when={theme() === "light"} fallback={<IoSunny />}>
        <IoMoon />
      </Show>
    </button>
  );
}
