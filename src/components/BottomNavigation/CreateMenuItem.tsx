import { JSX } from "solid-js";
import { DropdownItem } from "../Dropdown";

type CreateMenuItemProps = {
  href: string;
  icon: JSX.Element;
  title: string;
}

export function CreateMenuItem(props: CreateMenuItemProps) {
  return (
    <DropdownItem href={props.href} class="create-menu-item" unstyled>
      <div class="w-full h-full flex flex-col justify-center items-center text-3xl">{props.icon}</div>
      <div class="item-name">{props.title}</div>
    </DropdownItem>
  );
}