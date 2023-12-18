import { ParentProps, createContext, createSignal, mergeProps, useContext } from "solid-js";
import DropdownMenu from "./DropdownMenu";
import DropdownToggleButton from "./DropdownToggleButton";
import { DropdownContextType, DropdownProps } from "./types";
import "./style.css";

const DropdownContext = createContext<DropdownContextType>();

export function useDropdown() {
  return useContext(DropdownContext);
}

export function Dropdown(props: ParentProps<DropdownProps>) {
  const [isOpen, setIsOpen] = createSignal(false);
  const defaultProps: Pick<Required<DropdownProps>, "horizontalAlign"> = { horizontalAlign: "left" };
  const finalProps = mergeProps(defaultProps, props);

  return (
    <DropdownContext.Provider value={{
      isOpen, setIsOpen, id: finalProps.id, horizontalAlign: finalProps.horizontalAlign
    }}>
      <div classList={{ "relative inline-flex": true, open: isOpen() }}>
        {props.children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Menu = DropdownMenu;
Dropdown.ToggleButton = DropdownToggleButton;
