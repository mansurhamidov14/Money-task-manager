import { ParentProps } from "solid-js";
import { useDropdown } from "./";
import DropdownItem from "./DropdownItem";
import classNames from "classnames";

function DropdownMenu(props: ParentProps<{class?: string}>) {
  const dropdownContext = useDropdown()!;

  return (
    <div
      class={classNames(
        props.class,
        "dropdown-menu",
        dropdownContext.horizontalAlign,
        dropdownContext.isOpen() && "open"
      )}
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
