import { Accessor, Setter } from "solid-js";

export type DropdownHorizontalAlign = "left" | "right";

export type DropdownContextType = {
  id: string;
  horizontalAlign: DropdownHorizontalAlign;
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
}

export type DropdownProps = {
  id: string;
  horizontalAlign?: DropdownHorizontalAlign;
}
