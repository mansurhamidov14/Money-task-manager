import { ParentProps, Show, createMemo, mergeProps } from "solid-js";
import { useDropdown } from ".";
import { A } from "@solidjs/router";

type DropdownItemProps = ParentProps<{
  href?: string,
  class?: string,
  onClick?: () => void;
  unstyled?: boolean;
  size?: "sm" | "lg"
}>

export function DropdownItem(props: DropdownItemProps) {
  const finalProps = mergeProps({ class: "", size: "sm" }, props);
  const dropdown = useDropdown();
  const handleClick = (e: MouseEvent) => {
    if (!props.href) {
      e.preventDefault();
    }
    dropdown?.setIsOpen(false);
    finalProps.onClick?.();
  }

  const classList = createMemo(() => ({
    "dropdown-item": true,
    [finalProps.class]: Boolean(finalProps.class),
    "dropdown-item-default": !props.unstyled,
    [`dropdown-item-${finalProps.size}`]: true
  }));

  return (
    <Show when={finalProps.href} fallback={<a href="#" classList={classList()} onClick={handleClick}>{finalProps.children}</a>}>
      <A
        href={finalProps.href!}
        onClick={handleClick}
        classList={classList()}
      >
        {finalProps.children}
      </A>
    </Show>
  );
}
