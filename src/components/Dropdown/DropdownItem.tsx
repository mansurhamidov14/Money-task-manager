import { ParentProps, mergeProps } from "solid-js";
import { useDropdown } from ".";
import { A } from "@solidjs/router";

export function DropdownItem(props: ParentProps<{ href?: string, class?: string, onClick?: () => void, unstyled?: boolean }>) {
  const finalProps = mergeProps({ href: "#", class: "" }, props);
  const dropdown = useDropdown();
  const handleClick = (e: MouseEvent) => {
    if (!props.href) {
      e.preventDefault();
    }
    dropdown?.setIsOpen(false);
    finalProps.onClick?.();
  }

  return (
    <A
      href={finalProps.href}
      onClick={handleClick}
      classList={{
        "dropdown-item": true,
        [finalProps.class]: Boolean(finalProps.class),
        "dropdown-item-default": !props.unstyled
      }}
    >
      {finalProps.children}
    </A>
  );
}
