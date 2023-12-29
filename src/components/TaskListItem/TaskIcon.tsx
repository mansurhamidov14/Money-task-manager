import { FaRegularClipboard, FaSolidClipboardCheck } from "solid-icons/fa";
import { Show } from "solid-js";

export function TaskIcon() {
  return (
    <Show
      when={isDone()}
      fallback={(
        <div class="h-full flex justify-center items-center bg-amber-100 text-amber-400">
          <FaRegularClipboard size={24} />
        </div>
      )}
    >
      <div class="h-full flex justify-center items-center bg-green-100 text-green-600">
        <FaSolidClipboardCheck size={24} />
      </div>
    </Show>
  );
}
