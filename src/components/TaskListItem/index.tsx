import { Task, TaskStatus } from "@app/stores";
import { ListItem } from "../ListItem";
import { TaskIcon } from "./TaskIcon";
import { useDateFormatter } from "@app/providers";
import { createMemo } from "solid-js";

export function TaskListItem(props: Task) {
  const dateFormatter = useDateFormatter();
  const taskStatus = createMemo((): TaskStatus => {
    const doneDate = new Date(props.doneAt);
    const doneWithThisWeek = dateFormatter.withinThisWeek(doneDate);
    if (doneWithThisWeek && dateFormatter.isTodayOrAfter(doneDate)) {
      return "completed";
    } else if (!doneWithThisWeek && props.weekday >= dateFormatter.today.weekday) {
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
