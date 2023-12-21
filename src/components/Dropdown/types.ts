import { Accessor, Setter } from "solid-js";

export type DropdownHorizontalPlacement = "left" | "right" | "middle";
export type DropdownVerticalPlacement = "top" | "bottom";

export type DropdownContextType = {
  id: string;
  horizontalPlacement: DropdownHorizontalPlacement;
  verticalPlacement: DropdownVerticalPlacement;
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
  onOpen?: () => void;
  onClose?: () => void;
  overlayZIndex: number;
}

export type DropdownProps = {
  id: string;
  horizontalPlacement?: DropdownHorizontalPlacement;
  verticalPlacement?: DropdownVerticalPlacement;
  onOpen?: () => void;
  onClose?: () => void;
  hasOverlay?: boolean;
  overlayZIndex?: number;
}
