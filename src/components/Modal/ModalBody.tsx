import { ParentProps } from "solid-js";

export function ModalBody(props: ParentProps) {
  return (
    <div class="p-4 space-y-4">
      {props.children}
    </div>
  );
}
