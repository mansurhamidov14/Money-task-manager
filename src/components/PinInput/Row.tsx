import { ParentProps } from "solid-js";

export function Row(props: ParentProps) {
  return (
    <div class="flex gap-4 justify-center">
      {props.children}
    </div>
  );
}
