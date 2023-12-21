import { Show, splitProps } from "solid-js";
import { FiChevronDown, FiChevronUp } from "solid-icons/fi";
import { useDropdown } from "./";
import { Button, ButtonProps } from "../Button";

type DropdownToggleButtonProps = Omit<ButtonProps, "id" | "type" | "onClick" | "type"> & {
  unstyled?: boolean;
}

function DropdownToggleButton(props: DropdownToggleButtonProps) {
  const [localProps, forwardedProps] = splitProps(props, ["children", "unstyled"]);
  const dropdown = useDropdown()!;

  const handleClick = () => {
    const isOpen = dropdown.isOpen();
    if (isOpen && dropdown.onClose) {
      dropdown.onClose();
    }

    if (!isOpen && dropdown.onClose) {
      dropdown.onClose();
    }

    dropdown.setIsOpen(!isOpen);
  }

  const handleBlur = () => {
    setTimeout(() => dropdown.setIsOpen(false), 300);
  }

  return (
    <Show when={!localProps.unstyled} fallback={(
      <button id={dropdown.id} type="button" onBlur={handleBlur} onClick={handleClick} {...forwardedProps}>
        {localProps.children}
      </button>
    )}>
      <Button type="button" id={dropdown.id} onBlur={handleBlur} onClick={handleClick} class="min-w-[6em]" {...forwardedProps}>
        <div class="flex w-full justify-between items-center text-sm gap-2 px-2">
          <span>{localProps.children}</span>
          <Show when={dropdown.isOpen()} fallback={<FiChevronDown />}>
            <FiChevronUp />
          </Show>
        </div>
      </Button>
    </Show>
    
  );
}

export default DropdownToggleButton;
