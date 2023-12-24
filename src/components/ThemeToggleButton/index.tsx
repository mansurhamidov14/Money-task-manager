import { IoMoon, IoSunny } from "solid-icons/io";
import { Show } from "solid-js";
import { themeStore } from "@app/stores"
import { Button } from "../Button";

export function ThemeToggleButton() {
  const { theme, toggleTheme } = themeStore;
  return (
    <Button class="w-10 h-10 text-xl" size="md" variant="transparent" type="button" onClick={toggleTheme}>
      <Show when={theme() === "light"} fallback={<IoSunny class="text-yellow-200" />}>
        <IoMoon />
      </Show>
    </Button>
  );
}
