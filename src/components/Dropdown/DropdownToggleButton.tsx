import { Show, splitProps } from "solid-js";
import { FiChevronDown, FiChevronUp } from "solid-icons/fi";
import { useDropdown } from "./";
import { Button, ButtonProps } from "../Button";

function DropdownToggleButton(props: Omit<ButtonProps, "id" | "type" | "onClick">) {
  const [localProps, forwardedProps] = splitProps(props, ["children"]);
  const { id, isOpen, setIsOpen } = useDropdown()!;

  const handleClick = () => {
    setIsOpen(!isOpen());
  }

  return (
    <Button id={id} {...forwardedProps} onClick={handleClick} class="min-w-[6em]">
      <div class="flex w-full justify-between items-center text-sm gap-2 px-2">
        <span>{localProps.children}</span>
        <Show when={isOpen()} fallback={<FiChevronDown />}>
          <FiChevronUp />
        </Show>
      </div>
      
    </Button>
  );
}

export default DropdownToggleButton;
