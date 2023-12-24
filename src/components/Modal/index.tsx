import { ParentProps, createContext } from "solid-js";

export type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
}

export * from "./ModalHeader";
export * from "./ModalBody";
export * from "./ModalFooter";

export const ModalContext = createContext<{ onClose: () => void }>();

export function Modal(props: ParentProps<ModalProps>) {
  const handleOutsideClick = (e: MouseEvent & {currentTarget: HTMLDivElement; target: Element;}) => {
    if (!e.target.closest(".modal-window")) {
      props.onClose();
    }
  }

  return (
    <ModalContext.Provider value={{ onClose: props.onClose }}>
      <div
        tabindex="-1"
        classList={{
          "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full bg-gray-900/80": true,
          "block": props.isOpen,
          "hidden": !props.isOpen
        }}
        onClick={handleOutsideClick}
      >
        <div class="modal-window relative p-4 w-full max-w-md max-h-full mx-auto" classList={{ "animate-slide-down-in": props.isOpen }}>
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );
}
