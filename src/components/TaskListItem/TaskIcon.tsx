import { TaskStatus } from "@app/stores";
import { BsClipboard, BsClipboardCheckFill, BsClipboardX } from "solid-icons/bs";
import { Match, Switch } from "solid-js";

export function TaskIcon(props: {status: TaskStatus}) {
  return (
    <Switch
      fallback={(
        <div class="h-full flex justify-center items-center bg-red-100 text-red-600">
          <BsClipboardX size={24} />
        </div>
      )}
    >
      <Match when={props.status === "completed"}>
        <div class="h-full flex justify-center items-center bg-green-100 text-green-600">
          <BsClipboardCheckFill size={24} />
        </div>
      </Match>
      <Match when={props.status === "todo"}>
        <div class="h-full flex justify-center items-center bg-secondary-100 text-secondary-400">
          <BsClipboard size={24} />
        </div>
      </Match>
    </Switch>
  );
}
