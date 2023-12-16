import { ParentProps } from "solid-js";
import { useDropdown } from ".";

function DropdownItem(props: ParentProps<{ onClick: () => void }>) {
  const dropdown = useDropdown();
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    dropdown?.setIsOpen(false);
    props.onClick();
  }

  return (
    <a href="#" onClick={handleClick} class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700 cursor-pointer">
      {props.children}
    </a>
  );
}

export default DropdownItem;
