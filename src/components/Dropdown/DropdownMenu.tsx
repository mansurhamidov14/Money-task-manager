import { ParentProps } from "solid-js";
import { useDropdown } from "./";
import DropdownItem from "./DropdownItem";
import classNames from "classnames";

function DropdownMenu(props: ParentProps<{class?: string}>) {
  const dropdownContext = useDropdown()!;

  return (
    <div
      class={classNames(props.class, {
        "transition-[opacity,margin] duration hs-dropdown-open:opacity-100 min-w-[17ch] bg-white shadow-md rounded-lg p-2 mt-2 divide-y divide-gray-200 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700": true,
        "block absolute m-0 opacity-1 translate-y-10": dropdownContext.isOpen(),
        "opacity-0 hidden": !dropdownContext.isOpen(),
        "left-auto right-0": dropdownContext.horizontalAlign === "right",
      })}
      aria-labelledby={dropdownContext.id}
    >
      <div class="py-2 first:pt-0 last:pb-0">
        {props.children}
      </div>
    </div>
  );
}

DropdownMenu.Item = DropdownItem;
export default DropdownMenu;
