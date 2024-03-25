import { getLocale, langData, setLocale } from "@app/i18n";
import { availableLangs } from "@app/i18n/init";
import { For } from "solid-js";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggleButton,
  ThemeToggleButton
} from "..";

export function Header() {
  return (
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
  )
}