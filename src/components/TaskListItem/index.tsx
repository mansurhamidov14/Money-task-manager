import { Task, TaskStatus } from "@app/stores";
import { ListItem } from "../ListItem";
import { TaskIcon } from "./TaskIcon";
import { useDateProcessor } from "@app/providers";
import { createMemo } from "solid-js";

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
    <ListItem
      size="md"
      icon={<TaskIcon status={taskStatus()} />}
      title={<span classList={{"line-through font-normal text-muted": taskStatus() === "completed"}}>{props.title}</span>}
      rightElement={(<span class="text-muted text-sm">{props.time}</span>)}
    />
  );
}
