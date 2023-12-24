import { Action } from "@app/i18n";
import { ParentProps, useContext } from "solid-js";
import { ModalContext } from ".";

export function ModalHeader(props: ParentProps) {
  const modal = useContext(ModalContext);
  return (
    <div class="flex items-center justify-between px-4 py-3 border-b rounded-t dark:border-gray-600">
      {props.children}
      <button onClick={modal?.onClose} type="button" class="text-secondary-400 bg-transparent hover:bg-secondary-200 hover:text-secondary-700 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span class="sr-only">
          <Action>Close</Action>
        </span>
      </button>
    </div>
  )
}