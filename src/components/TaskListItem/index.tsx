import { IoCheckmark, IoClose } from "solid-icons/io";
import { JSX, Match, Show, Switch, createMemo } from "solid-js";
import { Message } from "@app/i18n";
import { Task, TaskStatus, tasksStore } from "@app/stores";
import { useDateProcessor } from "@app/providers";

import "./style.css";
import { Button, ButtonProps } from "..";
import { FaSolidCalendarCheck, FaSolidCalendarXmark } from "solid-icons/fa";

export function TaskListItem(props: Task) {
  const dateProcessor = useDateProcessor();
  const taskStatus = createMemo((): TaskStatus => {
    const doneWithThisWeek = dateProcessor.withinThisWeek(props.doneAt);
    if (doneWithThisWeek) {
      return "completed";
    } else if (!doneWithThisWeek && props.weekday >= dateProcessor.today.weekday) {
      return "todo";
    }

    return "missed";
  });

  const getToggleButtonProps = createMemo((): {
    variant: ButtonProps["variant"],
    nextValue: boolean,
    icon: JSX.Element
  } => {
    if (taskStatus() === "completed") {
      return {
        variant: "secondary",
        nextValue: false,
        icon: <FaSolidCalendarXmark size={20} />
      };
    }

    return {
      variant: "success",
      nextValue: true,
      icon: <FaSolidCalendarCheck size={20} />
    };
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
      <div class="text-right pr-2">
        <div class="text-lg font-semibold">
          {props.startTime}
        </div>
        <Show when={["completed", "missed"].includes(taskStatus())}>
          <div class="text-xs task-item-status-text">
            <Message>{`common.task.${taskStatus()}`}</Message>
          </div>
        </Show>
      </div>
      <div class="task-item-controls">
        <Button
          square
          variant={getToggleButtonProps().variant}
          class="rounded-none h-12 w-12"
          onClick={() => tasksStore.toggleDone(props, getToggleButtonProps().nextValue)}
        >
          {getToggleButtonProps().icon}
        </Button>
      </div>
    </div>
  );
}
