import { IoCheckmark, IoClose } from "solid-icons/io";
import { Match, Show, Switch, createMemo } from "solid-js";
import { Message } from "@app/i18n";
import { Task, TaskStatus } from "@app/stores";
import { useDateProcessor } from "@app/providers";

import "./style.css";

export function TaskListItem(props: Task) {
  const dateProcessor = useDateProcessor();
  const taskStatus = createMemo((): TaskStatus => {
    const doneWithThisWeek = dateProcessor.withinThisWeek(props.doneAt);
    if (doneWithThisWeek && dateProcessor.isTodayOrAfter(props.doneAt)) {
      return "completed";
    } else if (!doneWithThisWeek && props.weekday >= dateProcessor.today.weekday) {
      return "todo";
    }

    return "missed";
  });

  return (
    <div class={`task-item ${taskStatus()}`}>
      <div class="task-item-status">
        <Switch>
          <Match when={taskStatus() === "completed"}>
            <IoCheckmark />
          </Match>
          <Match when={taskStatus() === "missed"}>
            <IoClose />
          </Match>
        </Switch>
      </div>
      <div class="task-item-main">
        <div class="font-md">{props.title}</div>
        <div class="text-sm text-muted">{props.startTime} - {props.endTime}</div>
      </div>
      <div class="text-right">
        <div class="text-lg font-semibold">
          {props.startTime}
        </div>
        <Show when={["completed", "missed"].includes(taskStatus())}>
          <div class="text-xs task-item-status-text">
            <Message>{`common.task.${taskStatus()}`}</Message>
          </div>
        </Show>
      </div>
    </div>
  );
}
