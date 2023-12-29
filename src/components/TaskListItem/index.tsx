import { Task } from "@app/stores";
import { ListItem } from "../ListItem";
import { TaskIcon } from "./TaskIcon";

export function TaskListItem(props: Task) {
  return (
    <ListItem
      size="md"
      icon={<TaskIcon doneAt={props.doneAt} weekday={props.weekday} />}
      title={props.title}
      rightElement={(<span class="text-muted">{props.time}</span>)}
    />
  );
}
