import { ParentProps } from "solid-js";

export function ModalFooter(props: ParentProps) {
  return (
    <div class="flex items-center gap-3 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
      {props.children}
    </div>
  );
}
