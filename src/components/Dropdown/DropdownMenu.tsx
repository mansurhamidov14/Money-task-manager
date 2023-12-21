import { ParentProps } from "solid-js";
import { useDropdown } from "./";
import classNames from "classnames";

export function DropdownMenu(props: ParentProps<{class?: string, unstyled?: boolean }>) {
  const dropdownContext = useDropdown()!;

  return (
    <div
      class={classNames(
        props.class,
        "dropdown-menu",
        !props.unstyled && "dropdown-menu-default",
        dropdownContext.horizontalPlacement,
        dropdownContext.verticalPlacement,
        dropdownContext.isOpen() && "open"
      )}
      style={`z-index: ${dropdownContext.overlayZIndex + 1}`}
      aria-labelledby={dropdownContext.id}
    >
      <div class="py-2 first:pt-0 last:pb-0">
        {props.children}
      </div>
    </div>
  );
}

export default DropdownMenu;
