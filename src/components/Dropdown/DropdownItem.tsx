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
    <a href="#" onClick={handleClick} class="dropdown-item">
      {props.children}
    </a>
  );
}

export default DropdownItem;
